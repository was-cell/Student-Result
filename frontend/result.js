const funcapcha = () => {
  const capcha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@";
  let capcha1 = "";
  for (let i = 0; i < 5; i++) {
    capcha1 += capcha.charAt(Math.floor(Math.random() * capcha.length));
  }
  document.getElementById("captcha-box").textContent = capcha1;
};

window.onload = () => {
  funcapcha(); // ✅ First load par captcha show karo

  // ✅ Refresh button click par naya captcha
  document.getElementById('refresh_btn').addEventListener("click", funcapcha);
};

const funclick = (event) => {
  event.preventDefault(); // 🛑 Form submit ko roko

  const roll = document.getElementById("roll_num").value;
  const Dob  = document.getElementById("dob").value;
  const captcha_box = document.getElementById("captcha-box").textContent;
  const captcha = document.getElementById("captcha").value;

  if (roll === "") {
    alert("Please Enter your Roll Number");
    return;
  }

  if (Dob === "") {
    alert("Please Enter your DoB");
    return;
  }

  if (captcha === "" || captcha !== captcha_box) {
    location.reload(); // 🌀 Wrong captcha par reload
    return;
  }

  // ✅ Sahi hone par form manually submit karo (agar zarurat ho)
  document.getElementById("main-form").submit();
};

document.getElementById("btn").addEventListener("click", funclick);
