/**
 * Created by allison on 6/25/17.
 */

const sides = [-1, -1, 0, 0, 1, 1];

const rollFate = () => sides[Math.floor(Math.random() * sides.length)];

const roll4dFate = () => rollFate() + rollFate() + rollFate() + rollFate();

const basicSkillCheck = (skillValue, invokes) => roll4dFate() + skillValue + (2*invokes);

const passive = (skillValue, invokes, target) => {
    skillValue = parseInt(skillValue);
    invokes = parseInt(invokes) || 0;
    target = parseInt(target) || 0;
    const diceValue = basicSkillCheck(skillValue, invokes);

    if (diceValue < target) {
        return 'fail';
    }
    else if (diceValue == target) {
        return 'tie';
    }
    else if (diceValue > target && diceValue <= 2) {
        return 'success';
    }
    else if (diceValue > target && diceValue > 3) {
        return 'success-with-style';
    }
};

const active = (invokerParams, opponentParams) => {
    let {invokerSkillValue: invokerSkillValue, invokerInvokes: invokerInvokes} = invokerParams;
    let {opponentSkillValue: opponentSkillValue, opponentInvokes: opponentInvokes} = opponentParams;
    invokerSkillValue = parseInt(invokerSkillValue);
    invokerInvokes = parseInt(invokerInvokes);
    opponentSkillValue = parseInt(opponentSkillValue);
    opponentInvokes = parseInt(opponentInvokes);

    const target = basicSkillCheck(opponentSkillValue, opponentInvokes);

    return passive(invokerSkillValue, invokerInvokes, target);
}

module.exports = {
    rollFate,
    passive,
    active
};
