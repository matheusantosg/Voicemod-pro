var callFunction = {

  toggleMenu: function () {
    var buttonOpen = document.querySelector('.menu-hamburguer')
    var menu = document.querySelector('.menu-header')

    buttonOpen.addEventListener('click', function () {
      buttonOpen.classList.toggle('open')
      menu.classList.toggle('open')
    })
  },

  toggleMenuFooter: function () {
    var $titles = document.querySelectorAll('.menu-footer__title')

    $titles.forEach((title) => {
      title.addEventListener('click', function () {
        title.lastChild.classList.toggle('rotate')
        title.nextElementSibling.classList.toggle('open')
      })
    })
  },

  setDoubts: function () {
    var $boxInputs = document.querySelectorAll('.box-50')

    $boxInputs.forEach(function (box) {
      var $doubts = box.querySelector('.questions')

      $doubts.addEventListener('click', function () {
        if ($doubts.parentElement.classList.contains('df')) {
          var newElement = document.createElement('span')
          newElement.classList.add('doubts-resolved')
          newElement.textContent = 'Gastos que não estão diretamente ligados ao custo de produção. Como despesas financeiras, administrativas, comerciais etc.'
          box.append(newElement)
          setTimeout(function () {
            var newAppend = box.querySelector('.doubts-resolved')
            newAppend.remove()
          }, 4000)
        }
        if ($doubts.parentElement.classList.contains('cp')) {
          var newElement = document.createElement('span')
          newElement.classList.add('doubts-resolved')
          newElement.textContent = 'Valor investido para a aquisição ou produção de um produto ou serviço.'
          box.append(newElement)
          setTimeout(function () {
            var newAppend = box.querySelector('.doubts-resolved')
            newAppend.remove()
          }, 4000)
        }
        if ($doubts.parentElement.classList.contains('dv')) {
          var newElement = document.createElement('span')
          newElement.classList.add('doubts-resolved')
          newElement.textContent = 'Acontecem com a venda. Mais comuns são impostos sobre vendas e comissões pagas aos vendedores.'
          box.append(newElement)
          setTimeout(function () {
            var newAppend = box.querySelector('.doubts-resolved')
            newAppend.remove()
          }, 4000)
        }
        if ($doubts.parentElement.classList.contains('ml')) {
          var newElement = document.createElement('span')
          newElement.classList.add('doubts-resolved')
          newElement.textContent = 'Lucro que se espera sobre a venda. Você pode ter uma margem de lucro igual para todos os produtos, ou uma para cada produto.'
          box.append(newElement)
          setTimeout(function () {
            var newAppend = box.querySelector('.doubts-resolved')
            newAppend.remove()
          }, 4000)
        }
      })
    })
  },

  clearInputs: function () {
    var $howToDoCalc = document.querySelector('.howToDoCalc')
    var $buttonClear = document.querySelector('.calculator-button-clear')
    var $inputs = document.querySelectorAll('.form-calculator input[type="text"]')
    var $result = document.querySelector('.calculator-result-finaly')

    $buttonClear.addEventListener('click', function () {
      $inputs.forEach(function (input) {
        input.value = ''
        $result.innerHTML = '0,00'
        setTimeout(function () {
          $howToDoCalc.classList.remove('show')
        }, 500)
      })
    })
  },

  setValueRange: function () {
    var $inputs = document.querySelectorAll('.form-calculator .box-50')

    $inputs.forEach(function (box) {
      var range = box.querySelector('input[type="range"]')
      var text = box.querySelector('input[type="text"]')

      text.addEventListener('keyup', function () {
        range.value = text.value
      })

      range.addEventListener('change', function () {
        text.value = range.value
      })
    })
  },

  formatReal: function (int) {
    var tmp = int + "";
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 10) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return tmp;
  },

  calculateValue: function () {
    var $howToDoCalc = document.querySelector('.howToDoCalc')
    var $buttonInit = document.querySelector('.calculator-button-start')
    var $result = document.querySelector('.calculator-result-finaly')
    var df = document.querySelector('.calculate-df')
    var cp = document.querySelector('.calculate-cp')
    var dv = document.querySelector('.calculate-dv')
    var ml = document.querySelector('.calculate-ml')




    $buttonInit.addEventListener('click', function (e) {
      e.preventDefault()
      if (df.value === '' || df.value > 100) {
        df.classList.add('error')
        return
      }
      if (cp.value === '') {
        cp.classList.add('error')
        return
      }
      if (dv.value === '' || dv.value > 100) {
        dv.classList.add('error')
        return
      }
      if (ml.value === '' || ml.value > 100) {
        ml.classList.add('error')
        return
      } else {
        [df, dv, ml, cp].forEach(function (input) {
          input.classList.remove('error')
        })
      }
      var markup = parseFloat(100 / (100 - (parseInt(df.value) + parseInt(dv.value) + parseInt(ml.value))))
      var str = cp.value
      var cpFromated = str.replace(',', '').replaceAll('.', '')
      var price = parseFloat(cpFromated/100) * markup

      if (markup < 1) {
        Swal.fire({
          title: 'Opss!!',
          text: 'O valor do Markup não pode ser menor que 1',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }

      if (markup > 100) {
        Swal.fire({
          title: 'Opss!!',
          text: 'O valor do Markup não pode ser maior que 100',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      $result.innerHTML = `${price.toLocaleString('pt-br',{maximumFractionDigits: 2})}`
      setTimeout(function () {
        $howToDoCalc.classList.add('show')
      }, 500)
    })
  },

  init: function () {
    callFunction.toggleMenu()
    callFunction.toggleMenuFooter()
    callFunction.setDoubts()
    callFunction.clearInputs()
    callFunction.setValueRange()
    callFunction.calculateValue()
  }
}

callFunction.init()