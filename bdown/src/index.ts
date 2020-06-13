const download = (content: string, filename: string): void => {
    const psuedo = document.createElement('a');
    psuedo.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    psuedo.setAttribute('download', filename);
    psuedo.click();
};

export default download;
