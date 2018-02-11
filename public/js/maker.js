//For utility
$ = (el) => document.getElementById(el);
$$ = (el) => document.getElementsByClassName(el);

class Maker {
    constructor() {
        this.config={
            slidesListContainer: 'slides-list',
        };
        this.presentation = {
            presentationID: '',
            presentationName: '',
            slideData: []
        };
        this.selectedSlide;
        this.addSlide();
        this.renderSlides();
    }

    clickSlide(i) {
        this.selectedSlide = i;
        this.renderSlides();
    }

    renderSlides(){
        $(this.config.slidesListContainer).innerHTML = '';

        $('presentation-name').value = this.presentation.presentationName;

        $('slide-data').disabled = this.presentation.slideData.length > 0 ? false : true;

        for (var i in this.presentation.slideData) {
            const slide = this.presentation.slideData[i];
            const className = 'slides-list-item';
            const onclick = 'm.clickSlide(' + i + ')';
            const content = 'Slide ' + (parseInt(i) + 1);

            const markup = `<li class="${className}" onClick="${onclick}"><span>${content}</span><span class="oi oi-delete float-right" onclick='m.deleteSlide(` + i + `)'></span></li>`;

            $(this.config.slidesListContainer).innerHTML += markup;
        }
        if($(this.config.slidesListContainer).children.length > 0) {
            if(this.selectedSlide > $(this.config.slidesListContainer).children.length-1) {
                this.selectedSlide = $(this.config.slidesListContainer).children.length-1;
            }
            $(this.config.slidesListContainer).children[this.selectedSlide].classList.add('active');
            $('slide-data').value = this.presentation.slideData[this.selectedSlide].content;
        }
        else {
            $('slide-data').value = "";
        }
    }

    addSlide() {
        if(!this.selectedSlide) {
            this.selectedSlide = 0;
        }
        this.presentation.slideData.push({content:""});
        this.renderSlides();
    }

    deleteSlide(i) {
        this.presentation.slideData.splice(i, 1);
        this.renderSlides();
    }

    updatePresentationID(el) {
        this.presentation.presentationID = el.value;
    }

    updatePresentationName(el) {
        this.presentation.presentationName = el.value;
    }

    slideContentChange() {
        this.presentation.slideData[this.selectedSlide].content = $('slide-data').value;
    }

    savePresentation() {
        var url = '/make';

        var presentation = this.presentation;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({presentation: presentation}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error'))
            .then(response => console.log(response));
    }

    loadPresentation() {
        var url = '/make/' + this.presentation.presentationID;

        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error'))
            .then(response => this.initLoadedPresentation(response));
    }

    initLoadedPresentation(presentation) {
        if(presentation) {
            this.presentation = presentation;
        }
        this.renderSlides();
    }
}

let m = new Maker();