
export function toastSettings(type: string, position: string, dark: boolean = true) {
 if (dark){
  switch(type){
   case 'success':
    return {
    position, 
     style: {
      border: 'unset',
      padding: '12px 24px',
      color: '#151515',
      fontWeight: '600',
      background: "#8FD384",
      borderRadius: '5px',
     },
     iconTheme: {
      primary: '#151515',
      secondary: '#F26D21',
     }
    }
   case 'error': 
    return { 
     position,
     style: {
      border: 'unset',
      padding: '12px 24px',
      fontWeight: '600',
      background: "#a62626",
      color: '#FDFDFD',
      borderRadius: '5px',
     },
     iconTheme: {
      primary: '#a62626',
      secondary: '#FDFDFD'
     }
    };

   default: // default is promise
    return {
     position,
     style: {
      border: '1px solid #713200',
      padding: '16px',
      color: '#713200',
     },
     iconTheme: {
      primary: '#713200',
      secondary: '#F26D21'
     }
    }
  }
} else {
   switch(type){
    case 'success':
     return {
      position,
      style: {
       border: 'unset',
       padding: '12px 24px',
       color: '#151515',
       fontWeight: '600',
       background: "#8FD384",
       borderRadius: '5px',
      },
      iconTheme: {
       primary: '#151515',
       secondary: '#F26D21',
      }
     }
    case 'error': 
     return { 
      position,
      style: {
       border: 'unset',
       padding: '12px 24px',
       fontWeight: '600',
       background: "#a62626",
       color: '#FDFDFD',
       borderRadius: '5px',
      },
      iconTheme: {
       primary: '#a62626',
       secondary: '#FDFDFD'
      }
     };
 
    default: // default is promise
     return {
      position,
      style: {
       border: '1px solid #713200',
       padding: '16px',
       color: '#713200',
      },
      iconTheme: {
       primary: '#713200',
       secondary: '#F26D21'
      }
     }
   }
 }
}