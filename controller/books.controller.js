import BookApi from '../api/bookApi.js';

const api = new BookApi()

export const getAll = async (ctx) => {
  try {
    const books = await api.getAll()
    ctx.body = books
  } catch (error) {
    ctx.response.status = 500
  }
}

export const getOne = async (ctx) => {
  try {
    const book = await api.getOne(ctx.params.id)
    ctx.response.status = 200
    ctx.body = {
      success: true,
      book
    }
  } catch (error) {
    ctx.response.status = 500
  }
}

export const addOne = async (ctx) => {
  try {
    const newProd = await api.addOne(ctx.request.body)
    ctx.response.status =200
    ctx.body = {
      success: true,
      newProd
    }
  } catch (error) {
    ctx.response.status = 500
  }
}

export const putOne = async (ctx) => {
  try {
    const udpateBook = await api.putOne(ctx.params.id, ctx.request.body) 
    ctx.response.status = 200
    ctx.body = {
      success: true,
      udpateBook
    }
  } catch (error) {
    ctx.response.status = 500
  }
}

export const deleteOne = async (ctx) => {
  try {
    await api.deleteOne(ctx.params.id)
    ctx.response.status = 200
  } catch (error) {
    ctx.response.status = 500
  }
}