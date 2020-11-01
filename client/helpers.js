const distanceBetween = (obj1Center, obj2Center) => {
  console.log(obj1Center, 'THIS IS PLAYER');
  console.log(obj2Center, 'THIS IS MONSTER');
  const A = obj1Center.top - obj2Center.top;
  const B = obj1Center.left - obj2Center.left;
  const C = Math.sqrt((A * A) + (B * B));

  return C;
};

export default distanceBetween;
