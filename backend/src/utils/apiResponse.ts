class ApiResponse{
    public statusCode: number
    public data: object | string
    public message: string
    public success: boolean
    constructor(statusCode: number, data: object | string, message: string = "success!"){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.success = statusCode < 400
    }
}

export default ApiResponse