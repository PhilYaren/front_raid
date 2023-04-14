export const promiseAfterTimeout = (seconds: number) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve();
    }, seconds*1000);
  });
}
export const rotateWheel = (degr: any) => {
  let wheel: Element | null = document.querySelector('.wheel');
  wheel.style.transform = 'rotate('+degr+'deg)';
  return promiseAfterTimeout(3);
}

export const randomDegrees = () => {
  let randomFloat = Math.random()*360;
  let descreetDegrees = Math.round(randomFloat / 60) * 60;
  return descreetDegrees;
}
export const getCurrentColor = (currentDegrees: any) => {
  let numbers = ["1", "2", "3", "4", "5", "6"];
  let segmentCount = currentDegrees/60;
  let segmentShift = segmentCount % numbers.length;

  return numbers[segmentShift];
}
