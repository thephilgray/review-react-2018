import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  text: String,
  title: String,
  feature_image: String,
  claps: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String
    }
  ]
});

ArticleSchema.methods.clap = () => {
  this.claps += 1;
  return this.save();
};

ArticleSchema.methods.comment = (c) => {
  this.comments.push(c);
  return this.save();
};
ArticleSchema.methods.addAuthor = (authorId) => {
  this.author = authorId;
  return this.save();
};

ArticleSchema.methods.getUserArticle = (_id) => {
  this.find({ author: _id }).then(article => article);
};

export default mongoose.model('Article', ArticleSchema);
