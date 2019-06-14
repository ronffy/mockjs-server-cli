
const preApi = 'http:localhost:8888';

fetch(`${preApi}/api/users?count=10`)
  .then(rep => rep.json())
  .then(data => {
    let lis = ''
    const tpl = `<li data-id={id}><img src="{avatar}" /><span>{name}</span></li>`;
    
    data.forEach(({ id, name, avatar }) => {
      lis += strTemplate(tpl, {
        id,
        name,
        avatar
      })
    })

    document.getElementById('root').innerHTML = lis;
  })

function strTemplate(tpl, data) {
  if (!data) {
    return tpl;
  }
  return tpl.replace(/{(.*?)}/g, (match, key) => data[key.trim()]);
}
