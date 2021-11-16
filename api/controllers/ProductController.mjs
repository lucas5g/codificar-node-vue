class ProductController {

    static async load(req, res) {
        const files = req.files

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
}

export { ProductController }