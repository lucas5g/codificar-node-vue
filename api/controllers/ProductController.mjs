import csvtojson from 'csvtojson'
import axios from 'axios'
import { unzip, loadImage, imageBase64, checkUrl } from '../helpers/index.mjs'
class ProductController {

    static async load(req, res) {
        const files = req.files
        const { baseUrl } = req.body
            // console.log({ baseUrl })

        const existUrl = await checkUrl(baseUrl)

        if (!existUrl) {
            return res
                .status(404)
                .json({
                    msg: 'URL do Projeto não encontrada.'
                })
        }


        // return

        //@ts-ignore
        if (!('csv' in files)) {
            return res
                .status(400)
                .json({
                    msg: 'Envie os Produtos no arquivo .CSV'
                })
        }

        //@ts-ignore
        if (!('images' in files)) {

            return res
                .status(400)
                .json({
                    msg: 'Envie as imagens compactadas em .ZIP'
                })
        }

        // const  images:Array files?.images
        // const csv = files?.csv

        //Extrai as imagens do zip
        //@ts-ignore
        unzip(files.images[0].filename)

        //Produtos do csv
        //@ts-ignore

        const productsCsv = await csvtojson().fromFile(files.csv[0].path)

        //Retorna dos produtos
        const products = productsCsv.map(row => {
            const product = {
                key: row.key,
                Vendoritem: {
                    segment_id: row.segment_id,
                    category_id: row.category_id,
                    subcategory_id: row.subcategory_id,
                    item_name: row.item_name,
                    item_description: row.item_description,
                    item_status: row.item_status,
                    item_approved: row.item_approved,
                    item_location: row.item_location,
                    item_package_unit: row.item_package_unit,
                    item_price_per_unit: row.item_price_per_unit,
                    image_content: loadImage(row.item_name)
                },
                list_ingredients_option: '0',
                Vendoritem_ingredient_type_list: []
            }

            return product

        })

        // console.log({products})

        return res.json(
            products
        )

    }

    static async create(req, res) {

        // return res.json({body: req.body})
        const { product, baseUrl } = req.body


        if (baseUrl === '') {
            res.json({
                msg: 'Define a baseUrl do Projeto'
            })
            return
        }
        // console.log('create product')

        //add image
        product.Vendoritem.image_content = imageBase64(product.Vendoritem.item_name)

        // return res.json(product)

        const { data } = await axios.post(`${baseUrl}/api/v3/product/create.html`, product, { maxBodyLength: 20000000 })


        if (data.httpcode === '407') {
            return res.json({
                msg: ' - Já foi Cadastrado',
                product
            })
        }
        if (data.httpcode === 200) {
            return res.json({
                msg: ' - Cadastrado com Sucesso',
                product
            })
        }

        res.json({
            msg: ' - Erro',
            product,
            data
        })

    }
}

export { ProductController }