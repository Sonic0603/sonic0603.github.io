var ajaxCall = (key, url, prompt) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
          model: "gpt-3.5-turbo",
          /*prompt: prompt,
          max_tokens: 1024,
          n: 1,*/
          "messages": [{"role": "user", "content": prompt}],
          temperature: 0.1,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${key}`,
        },
        crossDomain: true,
        success: function (response, status, xhr) {
          resolve({ response, status, xhr });
        },
        error: function (xhr, status, error) {
          const err = new Error('xhr error');
          err.status = xhr.status;
          console.log(err);
          reject(err);
        },
      });
    });
  };
  
  const url = "https://api.openai.com/v1/chat";
  
  
  (function () {
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        </style>
        <div id="root" style="width: 100%; height: 100%;">
        </div>
      `;
    class MainWebComponent extends HTMLElement {
      async post(apiKey, endpoint, prompt) {
        const { response } = await ajaxCall(
          apiKey,
          `${url}/${endpoint}`,
          prompt
        );
        //console.log(response.choices[0].text);
        return response.choices[0].message.content;
      }
    }
    customElements.define("custom-widget", MainWebComponent);
  })();
