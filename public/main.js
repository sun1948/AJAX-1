let request;

const createXMLHttpRequest = (method, path) => {
  request = new XMLHttpRequest();
  request.open(method, path);
  request.send();
};

getCSS.onclick = () => {
  createXMLHttpRequest("GET", "/1.css");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const style = document.createElement("style");
      style.innerHTML = request.response;
      document.head.appendChild(style);
    }
  };
};

getJS.onclick = () => {
  createXMLHttpRequest("GET", "/2.js");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const script = document.createElement("script");
      script.innerHTML = request.response;
      document.body.appendChild(script);
    }
  };
};

getHTML.onclick = () => {
  createXMLHttpRequest("GET", "/3.html");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const div = document.createElement("div");
      div.innerHTML = request.response;
      document.body.appendChild(div);
    }
  };
};

getXML.onclick = () => {
  createXMLHttpRequest("GET", "/4.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const dom = request.responseXML;
      const content = dom.querySelector("warning").textContent;
      title.innerHTML = content;
    }
  };
};

getJSON.onclick = () => {
  createXMLHttpRequest("GET", "/5.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const array = JSON.parse(request.response);
      console.log(typeof array);
    }
  };
};

let n = 1;
nextPage.onclick = () => {
  createXMLHttpRequest("GET", `/page${n + 1}`);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const array = JSON.parse(request.response);
      array.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = item.id;
        xxx.appendChild(li);
      });
      n += 1;
    }
  };
};
