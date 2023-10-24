export function formatNumber(number) {
    return number.toLocaleString('ja-JP', {
      useGrouping: true,
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    
    });
  }

  export function formatNumberDecimal(number, decimal) {
    return number.toLocaleString('ja-JP', {
      useGrouping: true,
      style: 'decimal',
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  }
  