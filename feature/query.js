
function APIfeatures(query, queryParams){
    this.query = query // model.find()
    this.queryParams = queryParams // req.query (lay page, limt, sort,... tren param)

    this.paginating = () => {
        const page = this.queryParams.page * 1 || 1
        const limit = this.queryParams.limit * 1 || 5
        const skip = limit * (page - 1)
        this.query = this.query.limit(limit).skip(skip)
        // ProductModel.find() = ProductModel.find().limit(limit).skip(skip)
        return this
    }
    this.sorting = () => {
        const sort = this.queryParams.sort || '+price'
        this.query = this.query.sort(sort)
        // ProductModel.find() = ProductModel.sort(sort)
        return this
    }
    this.searching = () => {
        const search = this.queryParams.search 
        if(search){
            this.query = this.query.find({
                $text: {$search : search}
            })
        }
        else {
            this.query = this.query.find()
        }
        return this
    }
    this.filtering = () =>{
        const queryObj = {...this.queryParams} // lưu vào 1 obj để có thể dùng toán tử delete trong obj xóa các trường k liên quan
        const excludedFields = ['page', 'sort', 'limit', 'search']  // mảng các trường cần loại bỏ trước khi filter
        excludedFields.forEach(item => delete(queryObj[item])) // use method delete in obj  de loc bo cac truong tren

        queryString = JSON.stringify(queryObj)  // convert lại thành string để sử dụng method replace hỗ trợ xử lý chuyển thành câu truy vấn
        const regex = /\b(gt|gte|lt|lte|in)\b/g;
        queryString = queryString.replace(regex, match => '$' + match)
        this.query = this.query.find(JSON.parse(queryString))
        return this;
        //this.query = Products.find().find({
        //     {"price":{"$gt":"56.99"}}
        //  })

    }
    
}
module.exports = APIfeatures