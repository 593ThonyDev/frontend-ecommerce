export function formatDate(fecha: string | undefined): string {
    if (!fecha) return "";
    const date = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('es-ES', opciones);
}

export function getTwoWords(cadena: string) {
    // Dividir la cadena en palabras
    const palabras = cadena.split(" ");

    // Tomar las primeras dos palabras y unirlas de nuevo en una cadena
    const primerasDosPalabras = palabras.slice(0, 2).join(" ");

    return primerasDosPalabras;
}


export function scrollTop() {
    window.scrollTo(0, 0);
}