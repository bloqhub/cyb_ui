const fs = require('fs');
const fsPromises = fs.promises;

let takeScreenshot = async (driver) => {
  let uniqPath = new Date().toISOString().slice(0, 10);;
  return await driver.takeScreenshot().then(
    async function(image, err) {
      // console.log('err',err);
      let savePath = fs.realpathSync(__dirname+"/../../screenshots/");
      let filename=`${savePath}/${uniqPath}.png`;
      await fsPromises.writeFile(filename, image, 'base64');
    }
  )
};

module.exports = {
  takeScreenshot: takeScreenshot
}
