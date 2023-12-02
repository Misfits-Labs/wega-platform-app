export function parseError(error: any, customMessage: string){
 if (error.message){
   if(error.message.split("\n\n") && error.message.split("\n\n").length > 0) {
     return error.message.split("\n\n")[0];
   }
   return error.message
 } else {
   return customMessage;
 }
}