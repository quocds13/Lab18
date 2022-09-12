"use strict";

//Khai báo các biến bộ chọn
const petID = document.getElementById("input-id");
const petName = document.getElementById("input-name");
const petAge = document.getElementById("input-age");
const petType = document.getElementById("input-type");
const petWeight = document.getElementById("input-weight");
const petLength = document.getElementById("input-length");
const petColor1 = document.getElementById("input-color-1");
const petBreed = document.getElementById("input-breed");
const isVaccinated = document.getElementById("input-vaccinated");
const isDewormed = document.getElementById("input-dewormed");
const isSterilized = document.getElementById("input-sterilized");
const btnSubmit = document.getElementById("submit-btn");
const btnHealthy = document.getElementById("healthy-btn");
const btnBMI = document.getElementById("bmi-btn");
const bodyContent = document.getElementById("tbody");

// Khai báo biến kiểm tra thú cưng khỏe mạnh
let healthyCheck = false;

//Khái báo biến str hiển thị thông báo lỗi khi nhập dữ liệu
let strErr ='';

//Khởi tạo giá trị ban đầu
const pet1 = {
  id: "P001",
  petName: "Tom",
  age: 5,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "green",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterlilized: true,
  bmi: "?",
  date: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
};
const pet2 = {
  id: "P002",
  petName: "Red",
  age: 5,
  type: "Dog",
  weight: 10,
  length: 50,
  color: "black",
  breed: "Tabby",
  vaccinated: false,
  dewormed: true,
  sterlilized: true,
  bmi: "?",
  date: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
};
//Mảng arrPet lưu trữ các thú cưng
const arrPets = [pet1, pet2];

//----KHAI BÁO CÁC PHƯƠNG THỨC-----

//Kiểm tra dữ liệu đầu vào
function ValidateInput(id, age, weight, length, type, breed) {
  let isTrue = true;
  //Kiểm tra id trùng lặp hay k?
  if (arrPets.length > 0) {
    if (id !== null && id !== "") {
      for (let i = 0; i < arrPets.length; i++) {
        console.log(i);
        console.log(arrPets[i].id);
        if (arrPets[i].id === id) {
          strErr += "- ID must unique! \n";
          isTrue = false;
          break;
        }
      }
    } else {
      strErr += "- ID not empty!! \n";
    }
  }
  //Kiểm tra tuổi
  if (age < 1 || age > 15) {
    strErr += "- Age must be between 1 and 15! \n ";
    isTrue = false;
  }
  //Kiểm tra cân nặng
  if (weight < 1 || weight > 15) {
    strErr += "- Weight must be between 1 and 15! \n ";
    isTrue = false;
  }
  //Kiểm tra chiều dài
  if (length < 1 || length > 100) {
    strErr += "- Length must be between 1 and 100! \n ";
    isTrue = false;
  }
  //Kiểm tra loại thú cưng
  if (type === petType[0].value) {
    strErr += "- Please select Type! \n ";
    isTrue = false;
  }
  //
  if (breed === petBreed[0].value) {
    strErr += "- Please select Breed! \n";
    isTrue = false;
  }

  return isTrue;
};

//Clear input
function ClearInput() {
  petID.value = "";
  petName.value = "";
  petAge.value = "";
  petType.value = petType[0].value;
  petWeight.value = "";
  petLength.value = "";
  petColor1.value = "#000000";
  petBreed.value = petBreed[0].value;
  isVaccinated.checked = false;
  isDewormed.checked = false;
  isSterilized.checked = false;
};

//Render table
function RenderTable(arr) {
  bodyContent.innerHTML = "";
  for (let i = 0; i <= arr.length - 1; i++) {
    //Tạo 1 hàng mới
    const row = document.createElement("tr");
    //Render dữ liệu vào 1 hàng
    row.innerHTML = `
              <th scope="row">${arr[i].id}</th>
							<td>${arr[i].petName}</td>
							<td>${arr[i].age}</td>
							<td>${arr[i].type}</td>
							<td>${arr[i].weight} kg</td>
							<td>${arr[i].length} cm</td>
							<td>${arr[i].breed}</td>
							<td>
								<i class="bi bi-square-fill" style="color: ${arr[i].color}"></i>
							</td>
							<td><i class="bi ${
                arr[i].vaccinated
                  ? "bi-check-circle-fill"
                  : "bi bi-x-circle-fill"
              }"></i></td>
							<td><i class="bi ${
                arr[i].dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
              }"></i></td>
							<td><i class="bi ${
                arr[i].sterlilized
                  ? "bi-check-circle-fill"
                  : "bi bi-x-circle-fill"
              }"></i></td>
              <td>${arr[i].bmi}</td>
							<td>${arr[i].date}</td>
							<td><button type="button" class="btn btn-danger" id="btnDelete--${i}">Delete</button>
							</td>
      `;
    bodyContent.appendChild(row);

    //Tạo sự kiện cho từng nút xóa
    const btnDelete = document
      .getElementById(`btnDelete--${i}`)
      .addEventListener("click", () => {
        //Xóa dòng hiện tại được chọn. Nếu ok thì xóa hàng hiện tại và tải lại danh sách
        if (confirm("Are you sure?")) {
          //tải lại danh sách
          //Lưu pet vừa xóa
          let deleteCurrentPet = arr.splice(i, 1);
          //Xóa pet
          arr.splice(i, 1);
          // tải lại danh sách pet
          RenderTable(arr);
          /* Nếu btnHealthy ở trạng thái true thì sau khi xóa pet ở danh sách pet khỏe mạnh,
            sẽ xóa thêm pet có id tương ứng trong danh sách arrPets (đảm bảo dữ liệu đồng bộ).
          */
          if(healthyCheck)
          {
            arrPets.forEach((value, index)=>{
            if (value.id === deleteCurrentPet[0].id)
              arrPets.splice(index,1);
          });
        }
        }
      });
  }
};
//Thêm 1 thú cưng mới
const addNewPet = function () {
  let pet = {
    id: petID.value,
    petName: petName.value,
    age: Number(petAge.value),
    type: petType.value,
    weight: Number(petWeight.value),
    length: Number(petLength.value),
    color: petColor1.value,
    breed: petBreed.value,
    vaccinated: isVaccinated.checked,
    dewormed: isDewormed.checked,
    sterlilized: isSterilized.checked,
    bmi: "?",
    date: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  };
  if (
    ValidateInput(pet.id, pet.age, pet.weight, pet.length, pet.type, pet.breed)
  ) {
    arrPets.push(pet);
    ClearInput();
    RenderTable(arrPets);
  }
  else
  {
    alert(strErr.trimEnd());
  }
};

//----KHAI BÁO CÁC SỰ KIỆN----

//Sự kiện nút Submit
btnSubmit.addEventListener("click", addNewPet);

//Sự kiện nút Show healthy pet
btnHealthy.addEventListener("click", () => {
  let arrPetsStrong = []; // mảng pet khỏe mạnh
  /* Nút btnHealthy = true (hiển thị toàn bộ pet khỏe mạnh <=> arrPetsStrong),
   false là danh sách pet <=> arrPets*/
  healthyCheck = healthyCheck ? false : true;
  if (healthyCheck) {
    btnHealthy.textContent = "Show All Pet";
      for (let i = 0; i < arrPets.length; i++) {
        if (
          arrPets[i].vaccinated &&
          arrPets[i].dewormed &&
          arrPets[i].sterlilized
        )
          arrPetsStrong.push(arrPets[i]);
      }
    RenderTable(arrPetsStrong);
  } else {
    btnHealthy.textContent = "Show Healthy Pet";
    RenderTable(arrPets);
  }
});

//Sự kiện nút btnBMI: Tính chỉ số BMI của pet
btnBMI.addEventListener("click", () => {
  for (let i = 0; i < arrPets.length; i++) {
    if (arrPets[i].type === "Dog")
      arrPets[i].bmi = String(
        (arrPets[i].weight * 703) / arrPets[i].length ** 2
      ).slice(0, 4);
    else if (arrPets[i].type === "Cat")
      arrPets[i].bmi = String(
        (arrPets[i].weight * 886) / arrPets[i].length ** 2
      ).slice(0, 4);
  }
  RenderTable(arrPets);
});


//Sự kiện khi load trang
window.addEventListener("load", () => {
  RenderTable(arrPets);
});
