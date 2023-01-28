import { Context, Handlebars } from '../deps.ts';
import { saveColor, colors } from '../db/saveColor.ts';

export const createColor = async (ctx: Context) => {
  try {
    const value = ctx.request.body({ type: 'form' }).value;
    const color = (await value).get('color');
    if (color !== 'undefined' && color !== '') {
      saveColor(color);
    }
    ctx.response.status = 200;
    ctx.response.redirect('/colors');
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
};

export const getColors = async (ctx: Context) => {
  try {
    const handle = new Handlebars();
    ctx.response.status = 200;
    ctx.response.body = await handle.renderView('colors', { colors });
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
};
