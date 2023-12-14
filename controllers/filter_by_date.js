let Op = require("../sqlite").Op;
let literal = require("../sqlite").literal;
const Todo = require("../models/todo");

module.exports.filterByDate = async function (userid, startDate, endDate) {
  const formattedStartDate = `${startDate} 00:00:00`; //2023-12-13
  const formattedEndDate = `${endDate} 23:59:59`;

  try {
    const items = await Todo.findAll({
      where: {
        userid,
        createdAt: {
          [Op.between]: [
            literal(`'${formattedStartDate}'`),
            literal(`'${formattedEndDate}'`),
          ],
        },
      },
    });

    console.log("Filtered Items:", items); // Log the filtered items
    return items;
  } catch (err) {
    console.error("Error filtering todos:", err);
    throw new Error("Error filtering todos");
  }
};
