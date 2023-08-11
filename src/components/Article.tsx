interface ArticleBits {
  date: string;
  title: any;
  content: any;
}

const Article: React.FC<ArticleBits> = ({ date, title, content }) => {
  return (
    <article className="max-w-xl flex-col items-start">
      <div className="flex items-center gap-x-4 text-xs"></div>
      <div className="group relative">
        <time className="text-gray-500">{date}</time>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          {title}
        </h3>
        {content}
      </div>
    </article>
  );
};

export default Article;
