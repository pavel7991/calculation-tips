const form = document.querySelector('#calc-form')
const rowContent = form.querySelector('#row-content')

const addBtn = form.querySelector('#add-row-btn')
const calcBtn = form.querySelector('#calc-btn')

const modal = document.querySelector('#Modal')
const modalBody = modal.querySelector('#table-body')
const outputDailyEarnings = modal.querySelector('#daily-earnings')

let Waiter = {}
let generealEarnings // общий заработок 
let generalTips // общие чаевые
let dailyEarnings // забработок за день на 1 оффицианта



function createRow() {
  const newRow = document.createElement('div');
  newRow.className = 'row row-data'
  newRow.innerHTML = `
      <div class="form-floating mb-3 col-6 p-1">
            <input type="text" name="name" class="form-control rounded-3" placeholder="Имя">
            <label for="floatingInput" class="mx-1">Имя</label>
          </div>
          <div class="form-floating mb-3 col-3 p-1">
            <input type="number" name="cashbox" inputmode="numeric" pattern="[0-9]*" class="form-control rounded-3" placeholder="Касса">
            <label for="floatingPassword" class="mx-1">Касса</label>
          </div>
          <div class="form-floating mb-3 col-3 p-1">
            <input type="number" name="expiranza" inputmode="numeric" pattern="[0-9]*" class="form-control rounded-3" placeholder="Password">
            <label for="floatingPassword" class="mx-1">Expiranza</label>
          </div>     
  `
  return newRow
}

function addRow() {
  rowContent.appendChild(createRow())
}

let readingData = () => {

  const dataObj = {};
  generealEarnings = 0

  form.querySelectorAll('.row-data').forEach((row, rowIndex) => {
    const name = row.querySelector('input[name="name"]').value || 'NameERROR'
    const cashbox = row.querySelector('input[name="cashbox"]').value || 'error'
    const expiranza = row.querySelector('input[name="expiranza"]').value || 'error'
    const procentCashbox = cashbox * 0.04
    const earnings = procentCashbox + +expiranza
    generealEarnings += earnings

    const rowData = {
      name: name,
      cashbox: cashbox,
      expiranza: expiranza,
      procentCashbox: procentCashbox,
      earnings: earnings
    }
    dataObj[`waiter_${rowIndex + 1}`] = rowData;
  })

  return dataObj;
}


function calcTips() {
  let generalTips = form.querySelector('#general-tips').value
  dailyEarnings = ((generealEarnings + +generalTips) / Object.keys(Waiter).length).toFixed(1)
}

function outputCalc() {
  let html = ''

  for (let key in Waiter) {
    const waiter = Waiter[key]
    const tips = (dailyEarnings - waiter.earnings).toFixed(1)

    html += `
      <tr>
        <td>${waiter.name}</td>
        <td>${waiter.cashbox}</td>
        <td>${waiter.procentCashbox}</td>
        <td>${waiter.expiranza}</td>
        <td>${tips}</td>
      </tr>
    `
  }
  modalBody.innerHTML = `${html}`
  outputDailyEarnings.textContent = `${dailyEarnings}`
}

addBtn.addEventListener('click', () => {
  addRow()
})

calcBtn.addEventListener('click', () => {
  Waiter = readingData()
  calcTips()
  outputCalc()
})




