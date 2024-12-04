(function () {
  const observer = new MutationObserver(() => {
    
    const actionButtonsContainer = document.querySelector("#top-level-buttons-computed");

    if (actionButtonsContainer && !document.querySelector("#summary-button")) {
       const summaryButton = document.createElement("button");
      summaryButton.id = "summary-button";
      summaryButton.innerText = "Summary";
      summaryButton.style.cssText =
        "background-color: #ff0000; color: #fff; border: none; border-radius: 4px; padding: 6px 12px; margin-left: 8px; cursor: pointer;";

      actionButtonsContainer.appendChild(summaryButton);
      summaryButton.addEventListener("click", () => {
        const summaryElement = document.querySelector("#summary-content");
        const summaryHeading = document.querySelector("#summary-heading");

        if (summaryElement&&summaryHeading) {
        
          summaryElement.style.display =
            summaryElement.style.display === "none" || summaryElement.style.display === "" ? "block" : "none";
            summaryHeading.style.display =
            summaryHeading.style.display === "none" || summaryHeading.style.display === "" ? "block" : "none";
        } else {

          const descriptionDiv = document.querySelector("#description");

              console.log("Description div found:", descriptionDiv);

          if (descriptionDiv) {
            const social = document.querySelector("#social-links");
            if (social) {
              const summaryHeading=document.createElement("h2");
              summaryHeading.id="summary-heading";
              summaryHeading.style.cssText =
                "color: #000000; padding: 10px; background-color: #f1f1f1; margin-top: 16px; padding-left:0;";
                summaryHeading.textContent="Summary"
              const newSummaryElement = document.createElement("p");
              newSummaryElement.id = "summary-content";
              newSummaryElement.style.cssText =
                "font-size: 16px; color: #333; padding: 10px; padding-left:0; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 16px;";

              newSummaryElement.textContent =
                "This is a dummy summary for the YouTube video. Replace this with actual summary content.";
              social.insertAdjacentElement("afterend", summaryHeading);
              summaryHeading.insertAdjacentElement("afterend", newSummaryElement);
              console.log("Summary element added below button-container:", newSummaryElement);
            }
          }
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
