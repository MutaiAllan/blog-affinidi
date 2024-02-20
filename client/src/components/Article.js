import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Paywall from "./Paywall";
import { makeEmojiList } from "./emoji";

const initialState = {
  article: null,
  error: null,
  status: "pending",
};

function Article({ userProfile }) {
  const [{ article, error, status }, setState] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    if (userProfile) {
      setState(initialState);
      fetch(`https://blog-affinidi-7ssp.vercel.app/articles/${id}`).then((r) => {
        if (r.ok) {
          r.json().then((article) =>
            setState({ article, error: null, status: "resolved" })
          );
        } else {
          r.json().then((message) =>
            setState({ article: null, error: message['message'], status: "rejected" })
          );
        }
      });
    }
  }, [id, userProfile]);

  if (!userProfile) {
    return (
      <p>Please log in to view this content.</p>
    );
  }
  if (status === "pending") return <h1>Loading...</h1>;

  if (status === "rejected") {
    if (error === "Maximum pageview limit reached") {
      return <Paywall />;
    } else {
      return <h1>{error}</h1>;
    }
  }

  const { title, author, date, content, minutes_to_read } = article;
  const emojis = makeEmojiList(minutes_to_read);

  return (
    <article>
      <h1>{title}</h1>
      <small>
        <p>
          {date} • {emojis} {minutes_to_read} min read
        </p>
        <p>
          <em>Written by {author}</em>
        </p>
      </small>
    </article>
  );
}

export default Article;
