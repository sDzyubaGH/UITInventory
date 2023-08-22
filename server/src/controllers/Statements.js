class StatementsController {
  async get(req, res, next) {
    return res.status(200).json({ message: 'statements' })
  }
}

export default new StatementsController()