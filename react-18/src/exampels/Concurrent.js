// import React, { useMemo, useState, useTransition } from 'react';
// import { defaultItems } from './defaultItems';

// export default function Concurrent() {
//   const [value, setValue] = useState('');
//   const [filteredValue, setFilteredValue] = useState('');

//   const [items, setItems] = useState(defaultItems);
//   const [isPending, startTransition] = useTransition();

//   const filteredItems = useMemo(() => {
//     return items.filter((item) =>
//       item.title.toLocaleLowerCase().includes(filteredValue)
//     );
//   }, [filteredValue]);

//   const onChangeValue = (e) => {
//     setValue(e.target.value);
//     startTransition(() => {
//       setFilteredValue(e.target.value);
//     });
//   };

//   return (
//     <div>
//       <input type='text' value={value} onChange={onChangeValue} />
//       {isPending && <h1>Loading....</h1>}
//       <div>
//         {filteredItems.map((item) => (
//           <div key={item.id}>
//             <div>id = {item.id}</div>
//             <div>{item.title}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//========================================

//useDeferredValue и useTransition похожи в работе

import React, {
  useMemo,
  useState,
  useTransition,
  useDeferredValue,
} from 'react';
import { defaultItems } from './defaultItems';

export default function Concurrent() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState(defaultItems);

  const defferedValue = useDeferredValue(value);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLocaleLowerCase().includes(defferedValue)
    );
  }, [defferedValue]);

  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input type='text' value={value} onChange={onChangeValue} />
      <div>
        {filteredItems.map((item) => (
          <div key={item.id}>
            <div>id = {item.id}</div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
