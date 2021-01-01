import { InitialState } from "./types";
import FileStore from "../store";
import { getSearchFiles } from "../actions/types";
import { isEmpty } from "lodash";

abstract class View<T> {
    abstract render(state: T): void;
    abstract rerender(state: T): void;
}

export default class SearchFileView implements View<InitialState> {
    private readonly layout: string;
    private root: Element | null | undefined;
    private fileList: Element | null | undefined;
    private searchFileList: Element | null | undefined;

    constructor() {
        this.layout = SearchFileView.createLayout();
    }

    public searchFileHandler(element: string, store: FileStore): void {
        const inputElement = document.getElementById(element);
        if (inputElement) {
            inputElement.addEventListener("change", (e) => {
                const { value } = e.currentTarget as HTMLTextAreaElement;
                const { files } = store.getState();
                const filteredFiles = files.filter((file) =>
                    file.includes(value)
                );
                store.dispatch(getSearchFiles(filteredFiles));
            });
        }
    }

    public render(state: InitialState): void {
        this.root = document.querySelector("#root");
        if (this.root) {
            this.root.insertAdjacentHTML("afterbegin", this.layout);
            this.fileList = this.root.querySelector(".file-list");
            this.searchFileList = this.root.querySelector(".search-file-list");
        }

        if (this.fileList && this.searchFileList) {
            this.generateFileList(state.files, this.fileList);
            this.generateFileList(state.filteredFiles, this.searchFileList);
        }
    }

    public rerender(state: InitialState): void {
        if (this.searchFileList) {
            this.searchFileList.innerHTML = "";
            isEmpty(state.filteredFiles)
                ? this.searchFileList.insertAdjacentHTML(
                      "afterbegin",
                      "<li>Файл не найден...</li>"
                  )
                : this.generateFileList(
                      state.filteredFiles,
                      this.searchFileList
                  );
        }
    }

    private static createLayout(): string {
        return `<div>
                <input id="search-input" class="search-field" type="text" placeholder="Введите название файла..." />
                <div class="files">
                    <div>
                        <h2 class="files-title">Список файлов:</h2>
                        <ul class="file-list"></ul>
                    </div>
                    <div>
                        <h2 class="files-title">Найденные файлы:</h2>
                        <ul class="search-file-list"></ul>
                    </div>
                </div>
             </div>`;
    }

    private generateFileList(files: Array<string>, container: Element): void {
        files.forEach((file) => {
            const fileListElem = document.createElement("li");
            fileListElem.textContent = file;
            container.insertAdjacentElement("afterbegin", fileListElem);
        });
    }
}
