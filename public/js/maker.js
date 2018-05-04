//For utility
$ = (el) => document.getElementById(el);
$$ = (el) => document.getElementsByClassName(el);

class Maker {
    constructor(id) {
        this.config={
            slidesListContainer: 'slides-list',
        };
        this.presentation = {
            presentationID: id || '',
            presentationName: '',
            slideData: []
        };
        this.selectedSlide;
        if(id) {
            this.loadPresentation();
        }
        this.addSlide();
        this.renderSlides();
        this.initEditor();
        this.initSort();
    }

    initEditor() {
        pell.init({
            element: $('slide-data'),
            onChange: html => {
                this.slideContentChange();
            },
            actions: [
                'bold',
                'italic',
                'underline',
                'heading1',
                'heading2',
                'paragraph'
            ]
        });
    }

    initSort() {
        const sortable = Sortable.create($('slides-list'), {
            onUpdate: (e) => this.updateSlideOrder(e)
        });
    }

    clickSlide(i) {
        this.selectedSlide = i;
        this.renderSlides();
    }

    renderSlides() {
        const slides = this.presentation.slideData;

        $(this.config.slidesListContainer).innerHTML = '';

        $('presentation-name').value = this.presentation.presentationName;

        // $('slide-data').disabled = this.presentation.slideData.length > 0 ? false : true;

        for (var i in slides) {
            const slide = slides.find(s => s.index == i);
            const className = 'slides-list-item';
            const onclick = 'm.clickSlide(' + i + ')';
            const content = 'Slide ' + (parseInt(i) + 1);

            const markup = `<li class="${className}" onClick="${onclick}" data-index="${slide.index}" data-order="${slide.order}"><span>${content}</span><span class="delete-slide oi oi-delete float-right" onclick='m.deleteSlide(` + i + `)'></span></li>`;

            $(this.config.slidesListContainer).innerHTML += markup;
        }

        if($(this.config.slidesListContainer).children.length > 0) {
            if(this.selectedSlide > $(this.config.slidesListContainer).children.length-1) {
                this.selectedSlide = $(this.config.slidesListContainer).children.length-1;
            }
            $(this.config.slidesListContainer).children[this.selectedSlide].classList.add('active');
            if($('slide-data').content) {
                $('slide-data').content.innerHTML = this.presentation.slideData[this.selectedSlide].content;
            }
        }
        else {
            if($('slide-data').content) {
                $('slide-data').content.innerHTML = "";
            }
        }
    }

    addSlide() {
        const slideCount = this.getSlideCount();
        if(!this.selectedSlide) {
            this.selectedSlide = 0;
        }
        this.presentation.slideData.push({index:slideCount, order: (slideCount == 0 ? 0 : slideCount), content: ""});
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

    getSlideCount() {
        return this.presentation.slideData.length;
    }

    slideContentChange() {
        this.presentation.slideData[this.selectedSlide].content = $('slide-data').content.innerHTML;
    }

    updateSlideOrder(event) {
        const slides = $$('slides-list-item');
        let tmpSlides = [];
        let tmpSelected = this.selectedSlide;

        for(var i = 0; i < slides.length; i++) {
            tmpSlides[i] = this.presentation.slideData.find(s => s.index == parseInt(slides[i].getAttribute('data-order')));
            tmpSlides[i].order = i;
        }

        this.presentation.slideData = tmpSlides.slice();
        this.selectedSlide = this.presentation.slideData.find(s => s.order == parseInt(tmpSelected)).index;

        this.renderSlides();
    }

    startPresentation() {
        window.location.href = '/present/' + this.presentation.presentationID;
    }

    savePresentation() {
        var url = '/api/make/' + this.presentation.presentationID;

        var presentation = this.presentation;

        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({presentation: presentation}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error'))
            .then(response => console.log(response));
    }

    loadPresentation() {
        var url = '/api/make/' + this.presentation.presentationID;

        fetch(url, {
            method: 'GET',
            credentials: 'include',
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
            this.updateSlidesWithOrder();
        }
        this.renderSlides();
    }

    //hack to support previously saved presentations without ordered slides
    updateSlidesWithOrder() {
        let slides = this.presentation.slideData;
        for(var i in slides) {
            slides[i].index = parseInt(slides[i].index || i);
            slides[i].order = parseInt(slides[i].order || i);
        }
        console.log(slides);
    }
}

let m = new Maker($('presentationID').value);