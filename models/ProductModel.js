var Product = require("../mongoosemodel/Product.js")

module.exports=  {
    async create(data) {
        try{
         const product = new Product(data)
        let savedData= await product.save()
         return savedData
        }
        catch(err){
          console.log("Err",err)
          throw err
        }
     },
     /**
      * The function for updating Product
      * @param {data} input id of Product
      * @param {callback} callback function with err and response
      */
     async updateProduct(data) {
       try{
     let updated=  await  Product.updateOne(
             {
                 _id: data._id
             },
             data
         )
         return (updated.nModified) ? "Updated successfully" : "Failed to update"
           }
           catch(err){
               console.log("err",err)
             throw err
           }
     },
     /**
      * The function for get all Products
      * @param {data} input nothing
      * @param {callback} callback function with err and response
      */
     async getAll(data) {
         var page
         if (data.page) {
             page = data.page
         }else{
             page=1
         }
         var maxRow = 5
         var start = (page - 1) * maxRow
        
         var products = await Product.find({})
         .populate("categoryId")
         .skip(start)
         .limit(maxRow)
     if (_.isEmpty(products)) {
         return "No content"
     } else {
         let totalProduct = await Product.countDocuments({})
         var objToSend = {}
         objToSend.TotalCount = totalProduct
         objToSend.count = maxRow
         objToSend.result = products
         objToSend.status = 200
         return objToSend
     }
     },
     /**
      * The function for delete Product
      * @param {data} input id of Product
      * @param {callback} callback function with err and response
      */
     async deleteProduct(data) {
       let deletedOutput = Product.deleteOne({ _id: data._id })
       if (_.isEmpty(deletedOutput)) {
           throw "No Such Product Exist"
       }
       return deletedOutput
     },
     /**
      * The function for get one  Product
      * @param {data} input _id of Product
      * @param {callback} callback function with err and response
      */
     async getProduct(data) {
       try {
           let ProductData = await (await Product.findOne({ _id: data._id })).populated("categoryId")
           return _.isEmpty(ProductData) ? "No Product Found" : ProductData
       } catch (err) {
           throw err
       }
     }
};

