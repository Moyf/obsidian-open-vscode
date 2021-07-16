import { addIcon, FileSystemAdapter, Plugin } from 'obsidian';

let svg = `
<svg width="100%" height="100%" viewBox="0 0 30 30" version="1.1" fill="currentColor"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
  <path d="M30.865 3.448l-6.583-3.167c-0.766-0.37-1.677-0.214-2.276 0.385l-12.609 11.505-5.495-4.167c-0.51-0.391-1.229-0.359-1.703 0.073l-1.76 1.604c-0.583 0.526-0.583 1.443-0.005 1.969l4.766 4.349-4.766 4.349c-0.578 0.526-0.578 1.443 0.005 1.969l1.76 1.604c0.479 0.432 1.193 0.464 1.703 0.073l5.495-4.172 12.615 11.51c0.594 0.599 1.505 0.755 2.271 0.385l6.589-3.172c0.693-0.333 1.13-1.031 1.13-1.802v-21.495c0-0.766-0.443-1.469-1.135-1.802zM24.005 23.266l-9.573-7.266 9.573-7.266z"/>
</svg>`

addIcon('vscode-logo', svg);
export default class OpenVSCode extends Plugin {
	ribbonIcon: HTMLElement;

	async onload() {
		this.ribbonIcon = this.addRibbonIcon('vscode-logo', 'VSCode', () => {
			this.openVSCode();
		});

		this.addCommand({
			id: 'open-vscode',
			name: 'Open as Visual Studio Code workspace',
			callback: this.openVSCode.bind(this)
		});
	}

	async openVSCode() {
		if (!(this.app.vault.adapter instanceof FileSystemAdapter)) {
			return;
		}

		let path = this.app.vault.adapter.getBasePath();
		let url = "vscode://file/" + path;
		window.open(url, "_blank");
	}
}
