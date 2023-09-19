require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Kết nối MongoDB bằng Mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: "Person" },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

const Story = mongoose.model("Story", storySchema);
const Person = mongoose.model("Person", personSchema);

async function createAuthorAndStory() {
  // Tạo một tác giả
  const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: "Ian Fleming",
    age: 50,
  });

  // Lưu tác giả vào cơ sở dữ liệu
  await author.save();

  // Tạo một câu chuyện với tác giả đã tạo
  const story1 = new Story({
    title: "Casino Royale",
    author: author._id, // Gán _id từ đối tượng tác giả
  });

  // Lưu câu chuyện vào cơ sở dữ liệu
  await story1.save();

  // Kết nối đối tượng tác giả với câu chuyện
  author.stories.push(story1);
  await author.save();
}

async function print() {
  const story = await Story.findOne({ title: "Casino Royale" })
    .populate("author")
    .exec();
  // prints "The author is Ian Fleming"
  console.log("The author is %s", story.author.name);
}

// Gọi hàm để tạo tác giả và câu chuyện
createAuthorAndStory()
  .then(() => {
    console.log("Tạo tác giả và câu chuyện thành công.");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Lỗi:", error);
  });

print();
