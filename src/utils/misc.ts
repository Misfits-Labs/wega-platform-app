export function parseBarCount(count:number): string {
 switch(true) {
   case count >= 10 && count < 100:
     return '0'.concat(String(count));
   case count < 10:
     return '00'.concat(String(count));
   default: 
     return String(count);
 }
}

export function capitalize(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}