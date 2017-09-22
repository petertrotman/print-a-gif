import { h, app } from 'hyperapp'; // eslint-disable-line no-unused-vars
import PrintAGif from './lib';

app({
  state: {
    printagif: null,
  },
  view: (state, actions) => (
    <div>
      <form>
        <label for="gif-input">Select a Gif</label>
        <input
          type="file"
          name="gif-input"
          id="gif-input"
          accept="image/gif"
          onchange={actions.handleInputChange}
        />
      </form>
      <h2>Hello from hyperapp</h2>
      <p>Gif length: { state.printagif && state.printagif.length }</p>
    </div>
  ),
  actions: {
    handleInputChange: (state, actions, { target }) => {
      if (!target.files || target.files.length !== 1) return null;
      const f = new FileReader();
      const p = new Promise((resolve, reject) => {
        f.onerror = e => reject(e.type);
        f.onload = e => resolve(e.target.result);
        f.readAsArrayBuffer(target.files[0]);
      });
      return update => p.then(gif => update({ printagif: new PrintAGif(gif) }));
    },
  },
  root: document.getElementById('app'),
});
