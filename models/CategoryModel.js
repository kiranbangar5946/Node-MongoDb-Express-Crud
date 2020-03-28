var Category = require("../mongoosemodel/Category.js");


module.exports= {
 async create(data) {
   try{
    const category = new Category(data)
   let savedData= await category.save()
    return savedData
   }
   catch(err){
     console.log("Err",err)
     throw err
   }
},
/**
 * The function for updating Category
 * @param {data} input id of Category
 * @param {callback} callback function with err and response
 */
async updateCategory(data) {
  try{
let updated=  await  Category.updateOne(
        {
            _id: data._id
        },
        data
    )
    return (updated.nModified) ? "Updated successfully" : "Failed to update"
      }
      catch(err){
        throw err
      }
},
/**
 * The function for get all Categorys
 * @param {data} input nothing
 * @param {callback} callback function with err and response
 */
async getAll(data) {
    var page
    if (data.body.page) {
        page = data.body.page
    }
    else{
      page=1
  }
    var maxRow = 10
    var start = (page - 1) * maxRow
   
    var categories = await Category.find({})
    .skip(start)
    .limit(maxRow)
if (_.isEmpty(categories)) {
    return "No content"
} else {
    let totalCategory = await Category.countDocuments({})
    var objToSend = {}
    objToSend.TotalCount = totalCategory
    objToSend.count = maxRow
    objToSend.result = bets
    objToSend.status = 200
    return objToSend
}
},
/**
 * The function for delete Category
 * @param {data} input id of Category
 * @param {callback} callback function with err and response
 */
async deleteCategory(data) {
  let deletedOutput = Category.deleteOne({ _id: data._id })
  if (_.isEmpty(deletedOutput)) {
      throw "No Such Category Exist"
  }
  return deletedOutput
},
/**
 * The function for get one  Category
 * @param {data} input _id of Category
 * @param {callback} callback function with err and response
 */
async getCategory(data) {
  try {
      let categoryData = await Category.findOne({ _id: data._id })
      return _.isEmpty(categoryData) ? "No Category Found" : categoryData
  } catch (err) {
      throw err
  }
}
}

