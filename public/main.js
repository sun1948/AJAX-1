let request;
const createXMLHttpRequest = (method, path) => {
  request = new XMLHttpRequest();
  request.open(method, path);
  request.send();
};

const AJAX = (method, path, label, position) => {
  createXMLHttpRequest(method, path);
  if (position === "head") {
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const dom = document.createElement(label);
        dom.innerHTML = request.response;
        document.head.appendChild(dom);
      }
    };
  } else if (position === "body") {
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const dom = document.createElement(label);
        dom.innerHTML = request.response;
        document.body.appendChild(dom);
      }
    };
  }
};

getCSS.onclick = () => {
  AJAX("GET", "/1.css", "style", "head");
};

getJS.onclick = () => {
  AJAX("GET", "/2.js", "script", "body");
};

getHTML.onclick = () => {
  AJAX("GET", "/3.html", "div", "body");
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
