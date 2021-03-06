import csvtojson from 'csvtojson'
import axios from 'axios'
import path from 'path'
import { unzip, loadImage, imageBase64, checkUrl } from '../helpers/index.mjs'
import { commandFunction } from '../helpers/index.mjs'
import { exec } from 'child_process'
class ProductController {

    static async load(req, res) {
        const files = req.files
        const { baseUrl } = req.body

        // console.log(files.csv)
        // console.log({ baseUrl })

        const existUrl = await checkUrl(baseUrl)

        if (!existUrl) {
            return res
                .status(404)
                .json({
                    msg: 'URL do Projeto não encontrada.'
                })
        }

        //@ts-ignore
        if (!('csv' in files)) {
            return res
                .status(404)
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

        unzip(files.images[0].filename)

        const productsCsv = await csvtojson().fromFile(files.csv[0].path)
            // console.log(productsCsv[0])
            // console.log(productsCsv[0].hasOwnProperty('item_name'))
        if (!productsCsv[0].hasOwnProperty('item_name')) {
            return res
                .status(400)
                .json({
                    msg: `O CSV deve está configurado para separar os campos por vírgula ","
                         \n\nAbra o CSV no bloco de notas e verifique como esta a separação dos campos`
                })
        }
        if (!productsCsv[0].hasOwnProperty('key')) {
            return res
                .status(400)
                .json({
                    msg: `O CSV deve conter a coluna key`
                })
        }

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
                    image_content: loadImage(row.item_name),
                    timeslot_vendor_option: row.timeslot_vendor_option

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

        // return console.log(product)

        const { data } = await axios.post(`${baseUrl}/api/v3/product/create.html`, product, { maxBodyLength: 20000000 })

        console.log('data', data)

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


    static async deleteImages(req, res) {

        const command = `rm -rf ${path.resolve()}/uploads/*.* `

        exec(command, (error, stdout, stderr) => {
            if (error) {
                res.json({
                    msg: 'Erro ao tentar deletar as  imagens'
                })
                console.error(`exec error: ${error}`);
                return
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            res.json({
                msg: 'Todas as imagens foram deletadas'
            })
        })

        // console.log('delete image')
    }

}

export { ProductController }