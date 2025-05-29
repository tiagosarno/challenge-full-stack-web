import type { HttpContext } from '@adonisjs/core/http'

export default abstract class BasesController {
  protected abstract getModel(): any

  public async index({ response }: HttpContext) {
    try {
      const model = this.getModel()
      const data = await model.all()
      return response.ok(data)
    } catch (error) {
      return response.internalServerError(error.message)
    }
  }
  public async store({ request, response }: HttpContext) {
    try {
      const model = this.getModel()
      const allowedColumns = [...model.$columnsDefinitions.keys()].filter(
        (column) => !['id', 'createdAt', 'updatedAt'].includes(column)
      )

      const data = request.only(allowedColumns)
      const entity = await model.create(data)

      return response.created({
        message: 'success',
        data: entity,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Error',
        error: error.message,
      })
    }
  }
  public async show({ params, response }: HttpContext) {
    try {
      const { id } = params
      const model = this.getModel()
      const data = await model.find(id)
      return response.ok(data)
    } catch (error) {
      return response.notFound(error.message)
    }
  }
  public async update({ params, request, response }: HttpContext) {
    try {
      const { ...data } = request.all()
      const model = this.getModel()
      const entity = await model.findOrFail(params.id)
      entity.merge({ ...data })
      await entity.save()
      return response.ok(entity)
    } catch (error) {
      return response.internalServerError(error.message)
    }
  }
  public async destroy({ params, response }: HttpContext) {
    try {
      const model = this.getModel()
      const entity = await model.findOrFail(params.id)
      const result = await entity.delete()
      return response.ok(result)
    } catch (error) {
      return response.internalServerError(error.message)
    }
  }
}
