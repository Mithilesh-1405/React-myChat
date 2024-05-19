const User = require("../models/user");
const List = require("../models/list");
const csvParser = require("csv-parser");
const fs = require("fs");
const path = require("path");


//Adding the user to a particular list
exports.addUsers = async (req, res) => {
  const listId = req.params.listId;

  console.log(listId);

  // Find the list by its ID
  const list = await List.findById(listId);
  if (!list) {
    return res.status(404).json({ status: "error", message: "List not found" });
  }

  //Getting the csv file from postman request, creating an empty list of users and errors
  const file = req.file;
  const users = [];
  const errors = [];
  let successCount = 0;
  let errorCount = 0;

  //Read and parse the CSV file acquired
  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on("data", (row) => {
      console.log("Row name:", row.name);
      const properties = {};
      const customPropertiesObj = Object.fromEntries(list.customProperties);

      Object.keys(customPropertiesObj).forEach((prop) => {
        properties[prop] = row[prop] || customPropertiesObj[prop];
      });


      //After parsing the data from csv, adding the user to the database one by one
      users.push({
        listId,
        name: row.name,
        email: row.email,
        properties,
        unsubscribed:false
      });
    })
    .on("end", async () => {

      // Save each user to the database
      for (const user of users) {
        try {
          const newUser = new User(user);
          await newUser.save();
          successCount++;
        } catch (error) {
          errorCount++;
          user.error = error.message;
          errors.push(user);
        }
      }

      //Logging the respective error to a csv file in uploads folder
      const errorFilePath = path.join(
        __dirname,
        "..",
        "uploads",
        `errors_${listId}.csv`
      );
      if (errors.length > 0) {
        const errorCsv = errors
          .map(
            (err) =>
              `${err.name},${err.email},${err.properties.city},${err.error}`
          )
          .join("\n");
        fs.writeFileSync(errorFilePath, errorCsv);
      }

      const totalCount = await User.countDocuments({ listId });

      //sending the successfull added users count, errors count, total operations count, and the errorFile
      res.json({
        status: errors.length > 0 ? "partial_success" : "success",
        successCount,
        errorCount,
        totalCount,
        errorFile: errors.length > 0 ? errorFilePath : null,
      });
    });
};
