const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {

  let name = event.Records[0].s3.object.key;
  let size = event.Records[0].s3.object.size;
  let type = "jpg";
  let newImageObj = { name, size, type };
  console.log('newImageObj', newImageObj);

  let imageArr = [];

  let params = {
    bucket: "image-bucket-lab17",
    key: "image.json",
  }
  try {
    let data = await s3.getObject(params).promise();
    console.log('data', data);
    imageArr = JSON.parse(data.Body.toString());
    console.log("imageArr".imageArr);
  } catch (e) {
    console.log(e.message);
  }

  imageArr.push(newImageObj);
  params.Body = JSON.stringify(imageArr);

  try {
    await s3.putObject(params).promise();
  } catch (e) {
    console.log(e.message);
  }


  // DONE implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(imageArr),
  };
  return response;
};
