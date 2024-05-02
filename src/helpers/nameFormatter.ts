export function useNameFormatter(
  fullName: string,
  formatType: 'initials' | 'surname' | 'name' | 'patronimyc'
) {
  const names = fullName.trim().split(/\s+/);
  if (names.length < 3) {
    return 'Предоставьте полное имя с отчеством';
  }

  switch (formatType) {
    case 'initials':
      return `${names[0]} ${names[1][0].toUpperCase()}. ${names[2][0].toUpperCase()}.`;
    case 'surname':
      return `${names[0]}`;
    case 'name':
      return `${names[1]}`;
    case 'patronimyc':
      return `${names[2]}`;
    default:
      return names.map((name) => name[0].toUpperCase() + '.').join('');
  }
}
