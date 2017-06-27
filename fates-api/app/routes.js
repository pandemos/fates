/**
 * All RESTful routes are configured here
 *
 * Created by allison on 6/25/17.
 */

const router = require('koa-router')();

router.get('/', ctx => {
    ctx.body = "Done";
});

// graph
const graph = require('./graph.js');
router.get('/graph', async ctx => {
    await graph.all(ctx);
});

// action
const action = require('./services/action.js');
router.get('/roll', ctx => {
   ctx.body = action.rollFate();
});
router.get('/action/passive/skill/:skillValue/invokes/:invokes/target/:target', ctx => {
   ctx.body = action.passive(ctx.params.skillValue, ctx.params.invokes || 0, ctx.params.target || 0);
});
router.get('/action/active/invoker-skill/:invokerSkillValue/invoker-invokes/:invokerInvoker/opponent-skill/:opponentSkillValue/opponent-invokes/:opponentInvokes', ctx => {
   ctx.body = action.active(ctx.params, ctx.params);
});

module.exports = router;
