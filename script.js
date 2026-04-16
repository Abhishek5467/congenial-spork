const canvasSketch = window.canvasSketch;

const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true,

};

let mouse={ x:0, y:0 };
let hoverSegmentIndex=-1;
let points; 
let hoverDist=Infinity;
let elCanvas;

const sketch = ({ canvas }) => {
  points=[
    new Point({ x:200, y:540 }),
    new Point({ x:400, y:700}),
    new Point({ x:880, y:540 }),
    new Point({ x:600, y:700 }),
    new Point({ x:640, y:900 }),
  ]

  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);

  elCanvas=canvas;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.strokeStyle='#999';
    context.beginPath();
    context.moveTo(points[0].x,points[0].y);

    for(let i=1; i<points.length; i++){
      context.lineTo(points[i].x,points[i].y);

    }
    context.stroke();

    if(hoverSegmentIndex!==-1 && hoverDist<4000){
      const a=points[hoverSegmentIndex];
      const b=points[hoverSegmentIndex+1];

      const px=b.x-a.x;
      const py=b.y-a.y;

      const norm=px*px+py*py;

      if (norm !== 0){
        let u=((mouse.x-a.x)*px+(mouse.y-a.y)*py)/norm;
        u=Math.max(0,Math.min(1,u));

        const projX=a.x+u*px;
        const projY=a.y+u*py;
        context.strokeStyle = 'rgba(255,165,0,0.5)';
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();

        context.fillStyle='orange';
        context.beginPath();
        context.arc(projX,projY,5,0,Math.PI*2);
        context.fill();    
      }

    }

    context.beginPath();
    context.moveTo(points[0].x,points[0].y);
    
    for(let i=0; i<points.length-2; i++){
      const curr=points[i];
      const next=points[i+1];

      const midX=(curr.x+next.x)/2;
      const midY=(curr.y+next.y)/2;

      // context.beginPath();
      // context.arc(midX,midY,5,0,Math.PI*2);
      // context.fillStyle='blue';
      // context.fill(); 
      context.quadraticCurveTo(curr.x, curr.y, midX, midY);
    }

    const secondLast=points[points.length-2];
    const last=points[points.length-1];
    context.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);
    context.lineWidth=4;
    context.strokeStyle='blue';
    context.stroke();

    points.forEach(point=>point.draw(context));
  };
};

let activePoint=null;
let isDragging=false;
let hasMoved=false;

const onMouseDown = (e) => {
  const rect=elCanvas.getBoundingClientRect();

  const x=((e.clientX-rect.left)/rect.width)*elCanvas.width;
  const y=(e.clientY-rect.top)/(rect.height)*elCanvas.height;

  activePoint=null;
  let minDist=Infinity;
  points.forEach(p=>{
    const dx=p.x-x;
    const dy=p.y-y;
    const dd=Math.sqrt(dx*dx+dy*dy);

    if(dd<15&&dd<minDist){
      activePoint=p;
      minDist=dd;
    }
  });

  isDragging=!!activePoint;
  hasMoved=false;
  
  window.addEventListener('mousemove',onMouseMove);
  window.addEventListener('mouseup',onMouseUp);
};

const onMouseMove = (e) => {
  const rect=elCanvas.getBoundingClientRect();

  const x=((e.clientX-rect.left)/rect.width)*elCanvas.width;
  const y=(e.clientY-rect.top)/(rect.height)*elCanvas.height;

  mouse.x=x;
  mouse.y=y;

  if(activePoint){
    hasMoved=true;
    activePoint.x=x;
    activePoint.y=y;
  }

  let minDist=Infinity;
  hoverSegmentIndex=-1;

  for(let i=0; i<points.length-1; i++){
    const d=distancePointToSegment({ x,y }, points[i], points[i+1]);
    
    if(d<minDist){
      minDist=d;
      hoverSegmentIndex=i;
    }
  }
  hoverDist=minDist;
};

const onMouseUp = (e) => {
  if(!hasMoved){
    const rect=elCanvas.getBoundingClientRect();

    const x=((e.clientX-rect.left)/rect.width)*elCanvas.width;
    const y=(e.clientY-rect.top)/(rect.height)*elCanvas.height;

    let insertIndex=0;
    let minDist=Infinity;

    for(let i=0; i<points.length-1; i++){
      const d=distancePointToSegment({ x,y }, points[i], points[i+1]);

      if(d<minDist){
        minDist=d;
        insertIndex=i+1;
      }
    }

    points.splice(insertIndex,0,new Point({ x,y }));
  }
  activePoint=null;
  isDragging=false;
  hasMoved=false;

  window.removeEventListener('mousemove',onMouseMove);
  window.removeEventListener('mouseup',onMouseUp);
};

canvasSketch(sketch, settings);

class Point{
  constructor({ x,y,control=false }){
    this.x = x;
    this.y = y;
    this.control = control;
  }

  draw(context){
    context.save();
    context.translate(this.x, this.y);

    if(this===activePoint){
      context.fillStyle='blue';
    } else {
      context.fillStyle='black';
    }

    context.beginPath();
    context.arc(0,0,10,0,Math.PI*2);
    context.fill();

    context.restore();
  }

  hitTest(x,y){
    const dx=this.x-x;
    const dy=this.y-y;
    const dd=Math.sqrt(dx*dx+dy*dy);

    return dd<15;
  }
}

function  distancePointToSegment(point, start, end) {
    const px=end.x-start.x;
    const py=end.y-start.y;

    const norm=px*px+py*py;

    if(norm===0){
      return Math.hypot(point.x-start.x,point.y-start.y);
    }

    let u=((point.x-start.x)*px+(point.y-start.y)*py)/norm;
    u=Math.max(0,Math.min(1,u));

    const x=start.x+u*px;
    const y=start.y+u*py;

    const dx=x-point.x;
    const dy=y-point.y;

    return dx*dx+dy*dy;
}