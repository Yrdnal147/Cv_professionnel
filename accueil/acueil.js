document.querySelectorAll(".faq-question").forEach((question) =>{
    question.addEventListener("click" , function(){
    const answer = this.nextElementSibling;
    const button = this.querySelector(".toggle-btn");
    
    if (answer.style.display === "block") {
        answer.style.display = "none";
        button.textContent = "+";
    } else {
        answer.style.display = "block";
        button.textContent = "-";
    }
    
    
    
    });
    
    });
    
    
    document.getElementById("menu-toggle").addEventListener("click", function () {
        let menu = document.getElementById("mobile-menu");
        menu.classList.toggle("hidden");
    });
    
    document.querySelector("button").addEventListener("mouseover", function() {
        this.style.transform = "scale(1.05)";
    });
    
    document.querySelector("button").addEventListener("mouseout", function() {
        this.style.transform = "scale(1)";
    });