const distanceBetween = (obj1Center, obj2Center) => {
  const A = obj1Center.top - obj2Center.top;
  const B = obj1Center.left - obj2Center.left;
  const C = Math.sqrt((A * A) + (B * B));
  return C;
};

export default distanceBetween;
