import { useEffect, useState } from "react";
import "./App.css";

const config = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.2,
};

function App() {
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer = new window.IntersectionObserver(function (entries, self) {
      console.log("entries", entries);
      console.log("self", self);
      // iterate over each entry
      entries.forEach((entry) => {
        // process just the images that are intersecting.
        // isIntersecting is a property exposed by the interface
        if (entry.isIntersecting) {
          // custom function that copies the path to the img
          // from data-src to src
          loadImages(entry.target);
          // the image is now in place, stop watching
          self.unobserve(entry.target);
        }
      });
    }, config);

    const imgs = document.querySelectorAll("[data-src]");
    imgs.forEach((img) => {
      observer.observe(img);
    });
    return () => {
      imgs.forEach((img) => {
        observer.unobserve(img);
      });
    };
  }, []);

  const loadImages = (image) => {
    image.src = image.dataset.src;
  };

  return (
    <div className="App">
      <h2>Lazy Load Images</h2>
      <img src="/assets/img1.jpg" alt="img" width={500} height={250} />
      <img src="/assets/img2.jpg" alt="img" width={500} height={250} />
      <img src="/assets/img3.jpg" alt="img" width={500} height={250} />
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <img
        src={""}
        data-src="/assets/img4.jpg"
        alt=""
        width={500}
        height={250}
        className={loaded ? "loaded" : "loading"}
        onLoad={() => setIsLoaded(true)}
      />
      <img
        src={""}
        data-src="/assets/img5.jpg"
        alt=""
        width={500}
        height={250}
        className={loaded ? "loaded" : "loading"}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default App;
