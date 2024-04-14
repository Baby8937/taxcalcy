$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $('#taxForm').on('submit', function(e) {
      e.preventDefault();
      clearErrors();
      if (validateForm()) {
        const result = calculateTax();
        $('#resultText').text(`Your overall income will be ₹${result.toLocaleString()} after tax deductions.`);
        $('#resultModal').modal('show');
      }
    });

    function clearErrors() {
      $('.error-icon').hide();
      $('input').removeClass('error-input');
      $('select').removeClass('error-input');
    }

    function validateForm() {
      let valid = true;
      const income = $('#grossIncome').val();
      const extraIncome = $('#extraIncome').val();
      const deductions = $('#deductions').val();
      const ageGroup = $('#ageGroup').val();

      if (!/^\d*\.?\d+$/.test(income)) {
        $('#grossIncome').addClass('error-input').next('.error-icon').show();
        valid = false;
      }
      if (!/^\d*\.?\d+$/.test(extraIncome)) {
        $('#extraIncome').addClass('error-input').next('.error-icon').show();
        valid = false;
      }
      if (!/^\d*\.?\d+$/.test(deductions)) {
        $('#deductions').addClass('error-input').next('.error-icon').show();
        valid = false;
      }
      if (ageGroup === '') {
        $('#ageGroup').addClass('error-input').next('.error-icon').show();
        valid = false;
      }

      return valid;
    }

    function calculateTax() {
      const income = parseFloat($('#grossIncome').val());
      const extraIncome = parseFloat($('#extraIncome').val());
      const deductions = parseFloat($('#deductions').val());
      const ageGroup = $('#ageGroup').val();

      let taxableIncome = income + extraIncome - deductions;
      let tax = 0;
      if (taxableIncome > 800000) {
        switch (ageGroup) {
          case '<40':
            tax = 0.30 * (taxableIncome - 800000);
            break;
          case '40-59':
            tax = 0.40 * (taxableIncome - 800000);
            break;
          case '>=60':
            tax = 0.10 * (taxableIncome - 800000);
            break;
        }
        taxableIncome -= tax;
      }
      return taxableIncome;
    }
  });