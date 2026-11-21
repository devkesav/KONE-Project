document.addEventListener("DOMContentLoaded", function () {
	document.querySelector('#quote_view').addEventListener('click', (e) => {
		e.preventDefault(); 
    e.stopImmediatePropagation();

		let idx = e.target.dataset.idx;
		let domain = e.target.dataset.domain;
		let url = window.location.href;
		url= url.replace(/&/g, '&amp;');

		let popup = document.querySelector('#dpDimLayer');

		popup.querySelectorAll('.dpQuoteThesisChange__btnQuo').forEach((element) => {	// 인용 양식 선택 버튼 클릭 색 지우기
			element.classList.remove('select');
		})

		popup.querySelectorAll('.dpQuoteThesisChange__btnQuo')[0].classList.add('select');	// 버튼 선택 초기화

		popup.querySelectorAll('input[name="choice"]').forEach((elem) => {	// 기능 초기화
			elem.removeEventListener('change', (event) => {})
		})
		
		popup.querySelector('.dpQuoteThesisChange__list').removeEventListener('click', (event) => {})
		
		let params = new FormData();
		params.append('idx', idx);
		params.append('domain', domain);
		///_common/quote/quote.php
		fetch('/_common/quote/quote.php', {method : 'POST', body : params})
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let lang = data.lang;	// 언어
					let changeLang;	// 국문지일 때 한/영 구분
					let quoteSelect = '0';	// 선택된 인용양식, 처음은 APA 양식
					let str;	// 인용 문자열
					popup.querySelector('#quote-thesis-title').innerHTML = '_APA 양식';
			
					if (lang == 'ko') {
						//changeLang = 'ko';
					
						popup.querySelector('#input_language_radio_01').checked = true;

						str = CreateLangArray(data, 'ko', 'ko', quoteSelect);	// 언어에 맞는 배열 생성(처음은 APA 양식)
					} else {
						//changeLang = 'en';

						if (popup.querySelector('.ko_select')) {
							popup.querySelector('.ko_select').remove();
						}
						
						popup.querySelector('#input_language_radio_02').checked = true;
						
						str = CreateLangArray(data, 'en', 'en', quoteSelect);	// 언어에 맞는 배열 생성
					}

					popup.querySelector('.dpQuoteThesisChange__quoExam').innerHTML = convertQuoteStyle(str, quoteSelect);	// 인용 양식에 맞는 문자열 삽입

					//인용 스타일 선택
					popup.querySelector('.dpQuoteThesisChange__list').addEventListener('click', (event) => {
						event.preventDefault();
            event.stopImmediatePropagation();

						let list = event.target.closest('.dpQuoteThesisChange__btnQuo');
						let styleName = '';
						
						if (list) {
							quoteSelect = list.dataset.style;	// 현재 선택된 인용 양식 가져오기

							popup.querySelectorAll('.dpQuoteThesisChange__btnQuo').forEach((element) => {	// 인용 양식 선택 버튼 클릭 색 지우기
                element.classList.remove('select');
              })
let radioChoice = popup.querySelector('input[name="choice"]:checked').value;
						if (radioChoice == 'K') {
							changeLang = 'ko';
						} 
						if (radioChoice == 'E') {
							changeLang = 'en';
						}
							list.classList.add('select');

							str = CreateLangArray(data, lang, changeLang, quoteSelect);
							
							if (quoteSelect == 0) {
								styleName = '_APA 양식'
							} else if (quoteSelect == 1) {
								styleName = '_Chicago 양식'
							} else if (quoteSelect == 2) {
								styleName = '_MLA 양식'
							} else if (quoteSelect == 3) {
								styleName = '_IEEE 양식'
							} else if (quoteSelect == 4) {
								styleName = '_Haravard 양식'
							} else if (quoteSelect == 5) {
								styleName = '_ACS 양식'
							}
							CreateLangArray(data, lang, changeLang, quoteSelect);
							popup.querySelector('#quote-thesis-title').innerHTML = styleName;
							popup.querySelector('.dpQuoteThesisChange__quoExam').innerHTML = convertQuoteStyle(str, quoteSelect, changeLang);
						}
					})
			
					// 복사하기 
					popup.querySelector('.dpQuoteThesisChange__copy').addEventListener('click', (event) => {
						event.preventDefault();
						event.stopImmediatePropagation();
						
						let str = popup.querySelector('.dpQuoteThesisChange__quoExam').innerText;
						
						var textarea = document.createElement('textarea');
						
						popup.querySelector('#copyText').appendChild(textarea);
						textarea.value = str;                // 복사할 메시지
						textarea.select();
						textarea.setSelectionRange(0, 9999);    // For IOS
						document.execCommand('copy');
						popup.querySelector('#copyText').removeChild(textarea);
						alert('논문의 정보가 복사되었습니다.\n논문을 인용할 위치에서 붙여넣기 하세요.');
						
					})
					
					// 언어 선택
					popup.querySelectorAll('input[name="choice"]').forEach((elem) => {
						elem.addEventListener('change', (event) => {
							event.preventDefault();
							event.stopImmediatePropagation();
						
							if (event.target.value == 'E') {	// 현재 선택된 언어가 영어일 때
								changeLang = 'en';
								
								str = CreateLangArray(data, lang, changeLang, quoteSelect);
							} else {
								changeLang = 'ko';

								str = CreateLangArray(data, lang, changeLang, quoteSelect);
							}

							popup.querySelector('.dpQuoteThesisChange__quoExam').innerHTML = convertQuoteStyle(str, quoteSelect);
						})
					})

				

					// 내보내기 버튼
					popup.querySelectorAll('.dpQuoteThesisChange__export').forEach((elem) => {
						elem.addEventListener('click', (event) => {
							event.preventDefault();
              event.stopImmediatePropagation();
							
							let radioChoice = popup.querySelector('input[name="choice"]:checked').value;
						if (radioChoice == 'K') {
							changeLang = 'ko';
						} 
						if (radioChoice == 'E') {
							changeLang = 'en';
						}
						
							let type = event.target.dataset.type;	// 내보내기 타입 가져오기

							let exportStr = CreateLangArray(data, lang, changeLang, quoteSelect, 'export')	// 내보내기 내용 양식에 맞는 배열 생성

							downloadFile(exportStr, type, changeLang, domain, url);
						})
					})
        })
	})
})

/**
 * 인용 양식에 맞는 저자 문자열로 변환
 * @param data 저자 데이터
 * @param style 인용양식 구분 0 APA, 1 Chicago, 2 MLA, 3 IEEE, 4 Haravard, 5 ASC
 * @param changeLang 현재 선택된 언어 ko 한국어, en 영어
 * @return String
 */
function convertAuthorStyle(data, style, changeLang) {
	let str = '';

	data.forEach((item, i) => {
		if (changeLang == 'ko') {	// 언어에 따른 이름 표현 구분
			str += (item[0].surname + item[0].given_names);
		} else {
			str += `${item[0].given_names} ${item[0].surname}`;
		}
		
		if (data.length - 1 == i) {	// 마지막 인덱스일 때
			if (style == 3 || style == 4) {
				str += ', ';
			} else {
				str += '. ';
			}
		} else if ((style == '0' || style == '1' || style == '3' || style == '4') && data.length - 2 == i) {	// 마지막에서 두번째 인덱스일 때
			str += ' and ';
		} else if (style != '5') {
			str += ', ';
		} else if (style == '5') {
			str += '; ';
		}
	})

	return str;
};

/**
 * 인용 양식에 맞는 인용 문자열로 변환
 * @param data 인용 데이터
 * @param style 인용양식 구분 0 APA, 1 Chicago, 2 MLA, 3 IEEE, 4 Haravard, 5 ASC
 * @return String
 */
function convertQuoteStyle(data, style) {
	let str = data.author;

	if (style == '0') {
		str += `(${data.year}). ${data.article}. ${data.journal}, ${data.volume}(${data.issue}), ${data.fpage}-${data.lpage}.`;
	}

	if (style == '1') {
		str += `"${data.article}," ${data.journal} ${data.volume}, ${data.issue} (${data.year}) : ${data.fpage}-${data.lpage}.`;
	}

	if (style == '2') {
		str += `"${data.article}." ${data.journal}, vol.${data.volume}, no.${data.issue}, ${data.year}, pp. ${data.fpage}-${data.lpage}.`;
	}

	if (style == '3') {
		str += `"${data.article}," ${data.journal}, vol.${data.volume}, no.${data.issue}, pp. ${data.fpage}-${data.lpage}. ${data.year}.`;
	}

	if (style == '4') {
		str += `${data.year}. ${data.article}. ${data.journal}, ${data.volume}(${data.issue}), pp.${data.fpage}-${data.lpage}.`;
	}

	if (style == '5') {
		str += `${data.article}. ${data.journal} ${data.year}, ${data.volume}(${data.issue}), ${data.fpage}-${data.lpage}.`;
	}
	
	return str;
}

/**
 * 언어에 맞는 배열 생성
 * @param data 인용 데이터
 * @param lang 국문지 영문지 구분 ko 국문지, en 영문지
 * @param style 인용양식 구분 0 APA, 1 Chicago, 2 MLA, 3 IEEE, 4 Haravard, 5 ASC
 * @param changLang 현재 선택된 언어 ko 한국어, en 영어
 * @param downfile 파일 다운로드에 필요한 배열 구분
 * @return Object
 */
function CreateLangArray(data, lang, changeLang, style, downFile = '') {
	let authorLang, articleLang, journalLang, abstractLang, publisherLang;
	let author = data.author;	// 저자
	let volume = data.volume;	// 권
	let issue = data.issue;	// 호
	let article = data.article;	// 논문명
	let journal = data.journal;	// 저널명
	let fpage = data.fpage;	// 첫번째 페이지
	let lpage = data.lpage;	// 마지막 페이지
	let year = data.year;	// 발행연
	let month = data.month;	// 발행월
	let abstract = data.abstract;	// 초록
	let keyword = data.keyword;	// 키워드
	let doi = data.doi;	// doi (디지털 개체 식별자)
	let publisher = data.publisher;	// 발행기관명
	let issn = data.issn;		// ISSN
	let idx = data.idx;	// 논문 번호
	let authorArray;

	if (lang == 'en') {
		authorLang = author.en;
		articleLang = article.en;
		journalLang = journal.en;
		abstractLang = abstract.en;
		publisherLang = publisher.en;
	}

	if (lang == 'ko') {
		if (changeLang == 'ko') {
			authorLang = author.ko;
			articleLang = article.ko;
			journalLang = journal.ko;
			abstractLang = abstract.ko;
			publisherLang = publisher.ko;
		} 

		if (changeLang == 'en') {
			authorLang = author.en;
			articleLang = article.en;
			journalLang = journal.en;
			abstractLang = abstract.en;
			publisherLang = publisher.en;
		}
	}

	if (downFile == '') {
		authorArray = convertAuthorStyle(authorLang, style, changeLang);
	} else {
		authorArray = author;
	}

	let str = {
		'author' : authorArray,
		'article' : articleLang,
		'articleLang' : article,
		'journal' : journalLang,
		'volume' : volume,
		'issue' : issue,
		'fpage' : fpage,
		'lpage' : lpage,
		'year' : year,
		'month' : month,
		'abstract' : abstractLang,
		'keyword' : keyword,
		'doi' : doi,
		'publisher' : publisherLang,
		'issn' : issn,
		'idx' : idx,
		'lang' : lang
	}

	return str;
}

/**
 * 파일 다운로드
 * @param data 인용 데이터
 * @param type 내보내기 종류 0 Endnote, 1 Refworks 2 Mendeley, 3 Word/한글2018, 4 Bibtex, 5 Excel
 * @param changLang 현재 선택된 언어 ko 한국어, en 영어
 * @return FILE
 */
function downloadFile(data, type, changeLang, domain, url) {
	let str = '';
	let nowDate = new Date();
	let today = nowDate.getFullYear()+("00" + (nowDate.getMonth() + 1)).slice(-2)+("00" + nowDate.getDate()).slice(-2);

	if (type == 0 || type == 2 || type == 3 || type == 4) {
		let element = document.createElement('a');
		let extension;

		if (type == 0 || type == 2 || type == 4) {
			str += `TY  - \n`;
			str += `T1  - ${data.article}\n`;
			str += `TT  - ${data.lang == 'en' ? data.article : (changeLang == 'ko' ? data.articleLang.en : data.articleLang.ko)}\n`;
			str += `AB  - ${data.abstract}\n`;
	
			if (changeLang == 'ko') {
				data.author.ko.forEach((item) => {
					str += `A1  - ${item[0].surname}${item[0].given_names}\n`;
				})
			} else {
				data.author.en.forEach((item) => {
					str += `A1  - ${item[0].given_names} ${item[0].surname}\n`;
				})
			}
	
			str += `DP  - 누리미디어\n`;
			str += `JO  - ${data.journal}\n`;
			str += `SN  - ${data.issn}\n`;
			str += `VL  - ${data.volume}\n`;
			str += `IS  - ${data.issue}\n`;
			str += `SP  - ${data.fpage}\n`;
			str += `EP  - ${data.lpage}\n`;
	
			if (data.keyword.ko != '') {
				data.keyword.ko[0].forEach((item) => {
					str += `KW  - ${item}\n`;
				})
			}
	
			if (data.keyword.en != '') {
				data.keyword.en[0].forEach((item) => {
					str += `KW  - ${item}\n`;
				})
			}
			str += `LA  - ${data.lang == 'en' ? 'English' : 'Korean'}\n`;
			str += `PB  - ${data.publisher}\n`;
			str += `PY  - ${data.year}\n`;
			str += `UR  - ${url}\n`;
			str += `DO  - ${data.doi}\n`;
			str += `ER  - \n`;

			extension = `${type == 4 ? '.bib' : '.ris'}`;
		}

		if (type == 3) {
			str += `<?xml version="1.0" encoding="UTF-8"?>\n`;
			str += `<b:Sources xmlns="http://schemas.openxmlformats.org/officeDocument/2006/bibliography" xmlns:b="http://schemas.openxmlformats.org/officeDocument/2006/bibliography" SelectedStyle="">\n`;
			str += `\t<b:Source>\n`;
			str += `\t\t<b:Tag>저널 기사</b:Tag>\n`;
			str += `\t\t<b:SourceType>JournalArticle</b:SourceType>\n`;
			str += `\t\t<b:Year>${data.year}</b:Year>\n`;
			str += `\t\t<b:Month>${data.month}</b:Month>\n`;
			str += `\t\t<b:Guid></b:Guid>\n`;
			str += `\t\t<b:URL>${url}</b:URL>\n`;
			str += `\t\t<b:DOI>${data.doi}</b:DOI>\n`;
			str += `\t\t<b:Title>${data.article}</b:Title>\n`;
			str += `\t\t<b:ShortTitle></b:ShortTitle>\n`;
			str += `\t\t<b:StandardNumber>${data.issn}</b:StandardNumber>\n`;
			str += `\t\t<b:Pages>${data.fpage}-${data.lpage}</b:Pages>\n`;
			str += `\t\t<b:Volume>${data.volume}</b:Volume>\n`;
			str += `\t\t<b:Issue>${data.issue}</b:Issue>\n`;
			str += `\t\t<b:JournalName>${data.journal}</b:JournalName>\n`;
			str += `\t\t<b:Publisher>${data.publisher}</b:Publisher>\n`;
			str += `\t\t<b:Author>\n`;
			str += `\t\t\t<b:Author>\n`;
			str += `\t\t\t\t<b:NameList>\n`;

			if (changeLang == 'ko') {
				data.author.ko.forEach((item) => {
					str += `\t\t\t\t\t<b:Person>\n\t\t\t\t\t\t<b:Last>${item[0].surname}${item[0].given_names}</b:Last>\n\t\t\t\t\t</b:Person>\n`;
				})
			} else {
				data.author.en.forEach((item) => {
					str += `\t\t\t\t\t<b:Person>\n\t\t\t\t\t\t<b:Last>${item[0].given_names} ${item[0].surname}</b:Last>\n\t\t\t\t\t</b:Person>\n`;
				})
			}

			str += '\t\t\t\t</b:NameList>\n';
			str += `\t\t\t</b:Author>\n`;
			str += `\t\t</b:Author>\n`;
			str += `\t</b:Source>\n`;
			str += `</b:Sources>`;

			extension = '.xml'
		}
		
		element.setAttribute('href', 'data:str/plain;charset=utf-8,' + encodeURIComponent(str));
		element.setAttribute('download', `${domain}_metadata_${today}${extension}`);
		element.style.display = 'none'; //하이퍼링크 요소가 보이지 않도록 처리

		document.body.appendChild(element); //DOM body요소에 하이퍼링크 부착
		element.click(); //클릭 이벤트 트리거 - 이 시점에 다운로드 발생
		document.body.removeChild(element); //하이퍼링크 제거
	}

	if (type == 1) {
		str += `RT \n`;
		str += `SR \n`;
		str += `ID ${data.idx}\n`;

		if (changeLang == 'ko') {
			data.author.ko.forEach((item) => {
				str += `A1 ${item[0].surname}${item[0].given_names}\n`;
			})
		} else {
			data.author.en.forEach((item) => {
				str += `A1 ${item[0].given_names} ${item[0].surname}\n`;
			})
		}

		str += `T1 ${data.article}\n`;
		str += `JF ${data.journal}\n`;
		str += `YR ${data.year}\n`;
		str += `FD ${data.year}/${data.month}\n`;
		str += `VO ${data.volume}\n`;
		str += `IS ${data.issue}\n`;
		str += `SP ${data.fpage}\n`;
		str += `OP ${data.lpage}\n`;

		if (data.keyword.ko != '') {
			data.keyword.ko[0].forEach((item) => {
				str += `K1 ${item}\n`;
			})
		}

		if (data.keyword.en != '') {
			data.keyword.en[0].forEach((item) => {
				str += `K1 ${item}\n`;
			})
		}

		str += `AB ${data.abstract}\n`;
		str += `PB ${data.publisher}\n`;
		str += `SN ${data.issn}\n`;
		str += `UL ${url}\n`;
		str += `LA ${data.lang == 'en' ? 'English' : 'Korean'}\n`;

		document.querySelector('#importData').innerHTML = str;

		let refWin = window.open('about:blank', 'refworks');	// 새창으로 열기
		
		let frm = document.querySelector('#dev_exportRWForm');
		frm.target = "refworks";

		frm.submit();
	}

	if (type == 5) {
		let wb = XLSX.utils.book_new();
		let author = '';
		if (changeLang == 'ko') {
				data.author.ko.forEach((item, i) => {
					author += `${item[0].surname}${item[0].given_names}`;
					if (data.author.ko.length - 1 == i) {	// 마지막 인덱스일 때
						author += '';
					} else {
						author += ', ';
					}
				})
			} else {
				data.author.en.forEach((item, i) => {
					author += `${item[0].given_names} ${item[0].surname}`;
					if (data.author.en.length - 1 == i) {	// 마지막 인덱스일 때
						author += '';
					} else {
						author += ', ';
					}
				})
			}

		// sheet명 생성
		wb.SheetNames.push("first");
		// wb.SheetNames.push("sheet 2"); // 시트가 여러개인 경우

		// 이중 배열 형태로 데이터가 들어간다.
		let wsData = [['No', '발행기관명', '저널명', '권·호', '논문제목', '저자명', '발행연월', '페이지', '초록', 'DOI'], ['1', data.publisher, data.journal, `${data.volume}·${data.issue}`, data.article, author, `${data.year}.${data.month}`, `${data.fpage}-${data.lpage}`, data.abstract, data.doi]];
		// let wsData2 = [['가1' , '가2', '가3'],['나1','나2','나3']];	// 시트가 여러개인 경우

		// 배열 데이터로 시트 데이터 생성
		let ws = XLSX.utils.aoa_to_sheet(wsData);
		// let ws2 = XLSX.utils.aoa_to_sheet(wsData2); 	//시트가 여러개인 경우

		// 시트 데이터를 시트에 넣기 ( 시트 명이 없는 시트인경우 첫번째 시트에 데이터가 들어감 )
		wb.Sheets["first"] = ws;
		// wb.Sheets["sheet 2"] = ws2;	//시트가 여러개인 경우

		// 엑셀 파일 쓰기
		let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

		// 파일 다운로드
		saveAs(new Blob([creatFile(wbout)],{type:"application/octet-stream"}), `${domain}_${today}.xlsx`);
	}
}

function creatFile(wbout) {
	let buf = new ArrayBuffer(wbout.length); //convert s to arrayBuffer
	let view = new Uint8Array(buf);  //create uint8array as viewer

	for (let i=0; i < wbout.length; i++) {
		view[i] = wbout.charCodeAt(i) & 0xFF; //convert to octet
	}

	return buf;
}