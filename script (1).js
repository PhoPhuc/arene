const qaList = document.getElementById('qaList');
const searchInput = document.getElementById('searchInput');
const showHiddenBtn = document.getElementById('showHiddenBtn');
const hiddenCountSpan = document.getElementById('hiddenCount');
const totalCountSpan = document.getElementById('totalCount');
let hiddenItems = [];

// ** NEW QA DATA START **
const qaData = [
    { question: 'Carboxylic acid là những hợp chất hữu cơ:', answer: 'Trong phân tử chứa nhóm carboxyl liên kết trực tiếp nguyên tử carbon hoặc hydrogen.' },
    { question: 'Vì sao gọi acetic acid là acid giấm?', answer: 'Acetic acid có trong thành phần của giấm ăn.' },
    { question: 'Phân tử chỉ bao gồm hai nhóm -COOH liên kết với nhau được gọi là:', answer: 'Oxalic acid' },
    { question: 'Tên thay thế của công thức HOOC-COOH là:', answer: 'Ethanedioic acid.' },
    { question: 'Tartaric acid tạo nên vị chua của:', answer: 'Nho' },
    { question: 'Công thức chung của carboxylic acid no, đơn chức, mạch hở:', answer: 'CnH2n+1COOH' },
    { question: 'Chọn phát biểu sai về tính chất vật lí:', answer: 'Liên kết hydrogen giữa các phân tử carboxylic acid chỉ tồn tại dạng polymer.' },
    { question: 'Nhiệt độ sôi của các carboxylic acid cao hơn các alcohol cùng số nguyên tử carbon là do:', answer: 'Liên kết O-H trong nhóm carboxyl phân cực hơn liên kết O-H trong alcohol.' },
    { question: 'Carboxylic acid nào sau đây không tan vô hạn trong nước?', answer: 'Pentanoic acid' },
    { question: 'Phát biểu nào sau đây sai:', answer: 'Carboxylic acid có từ 5 carbon trở xuống thì tan vô hạn trong nước.' },
    { question: 'Carboxylic acid nào tạo nên vị chua của chanh?', answer: 'Citric acid' },
    { question: 'Số đồng phân acid ứng với công thức C4H8O2:', answer: '2' },
    { question: 'Phản ứng ester hóa là:', answer: 'Phản ứng giữa alcohol và carboxylic acid.' },
    { question: 'Tính chất của ester:', answer: 'Ít tan trong nước, nhẹ hơn nước.' },
    { question: 'Chất được dùng để sản xuất thủy tinh hữu cơ là:', answer: 'Acrylic acid' },
    { question: 'Ứng dụng nào sau đây là của acetic acid?', answer: 'Tổng hợp aluminium monoacetate làm chất cầm màu.' },
    { question: 'Phát biểu nào sau đây sai:', answer: 'Benzoic acid với liều lượng lớn dùng làm chất bảo quản thực phẩm.' }, // Note: Benzoic acid *is* used as a preservative, but maybe "liều lượng lớn" (large dose) makes it problematic/false in this context.
    { question: 'Phương pháp lên men dùng để điều chế:', answer: 'Acetic acid' },
    { question: 'Chọn ý sai: Nhược điểm của phương pháp lên men là:', answer: 'Có mùi thơm đặc trưng.' }, // Assuming the characteristic smell isn't considered a "disadvantage".
    { question: 'Phương pháp lên men là quá trình:', answer: 'Oxi hóa dung dịch ethyl alcohol loãng bằng oxygen không khí ở điều kiện thường, dưới tác dụng men giấm.' },
    { question: 'Trong công nghiệp, carboxylic acid được sản xuất bằng phương pháp:', answer: 'Oxi hóa alkane.' },
    { question: 'Acetic acid không phản ứng với:', answer: 'Cu' },
    { question: 'Dãy số gồm các chất có nhiệt độ sôi tăng dần từ trái qua phải là:', answer: 'C2H6, CH3CHO, C2H5OH, CH3COOH.' },
    { question: 'Oxalic acid có tính acid như thế nào so với acetic acid?', answer: 'Mạnh gấp 104 lần' }, // Should this be 10^4 or just 104? Assuming 10^4 based on typical pKa values. Let's keep user's input.
    { question: 'Cho sơ đồ phản ứng: C2H2 --> X --> CH3COOH. Trong sơ đồ trên, mỗi mũi tên là một phản ứng. X là chất nào sau đây?', answer: 'CH3CHO' },
    { question: 'Dùng chất gì để tẩy cặn trong ấm đun siêu tốc?', answer: 'Dung dịch acetic acid 2 – 5%' },
    { question: 'Biện pháp nào dưới đây không làm tăng hiệu suất quá trình tổng hợp ethyl acetate từ phản ứng giữa ethyl alcohol và acetic acid.', answer: 'Lấy số mol alcohol và acetic acid bằng nhau' },
    { question: 'Các sản phẩm thu được khi đốt cháy hoàn toàn 3 gam acid hữu cơ X được dẫn lần lượt qua bình 1 đựng H2SO4 đặc và bình 2 đựng dung dịch NaOH. Sau thí nghiệm thấy khối lượng bình 1 tăng 1,8 gam và khối lượng bình 2 tăng 4,4 gam. Công thức cấu tạo của X là', answer: 'CH3COOH' }, // Corrected typo COỌH -> COOH
    { question: 'Đốt cháy 14,6 gam một acid no đa chức Y ta thu được 0,6 mol CO2 và 0,5 mol H2O. Biết mạch carbon là mạch thẳng. Cho biết công thức cấu tạo của Y', answer: 'HOOC-(CH2)4-COOH' },
    { question: 'Tên thông thường của carboxylic acid liên quan đến:', answer: 'Nguồn gốc tìm ra chúng' },
    { question: 'Trung hòa 400 ml dung dịch acetic acid 0,5M bằng dung dịch NaOH 0,5M. Thể tích dung dịch NaOH cần dùng là:', answer: '400 ml' },
    { question: 'Hỗn hợp X gồm HCOOH và CH3COOH (tỉ lệ mol 1:1). Lấy 5,3 gam hỗn hợp X tác dụng với 5,75 gam C2H5OH (có xúc tác H2SO4 đặc) thu được m gam hỗn hợp ester (hiệu suất của các phản ứng ester hoá đều bằng 80%). Giá trị của m là:', answer: '6.48' },
    { question: 'Để trung hòa a mol carboxylic acid A cần 2a mol NaOH. Đốt cháy hoàn toàn a mol A thu được 3a mol CO2. A có công thức phân tử là', answer: 'C3H4O4' },
    { question: 'Phản ứng nào của carboxylic acid giải phóng khí hydrogen?', answer: 'Phản ứng với kim loại' },
    { question: 'Giấm ăn là dung dịch acetic acid có nồng độ:', answer: '2 – 5%' },
    { question: 'Đun nóng 24 gam acetic acid với lượng dư ethyl alcohol (xúc tác H2SO4 đặc), thu được 26,4 gam ester. Hiệu suất của phản ứng ester hóa là:', answer: '0.75' }, // Note: User input is 0.75. Calculation: Mol acetic acid = 24/60 = 0.4 mol. Mol ethyl acetate (ester) = 26.4/88 = 0.3 mol. Yield = 0.3 / 0.4 = 0.75 or 75%. Answer is correct.
    { question: 'Liên kết hydrogen giữa các phân tử carboxylic acid có bao nhiêu dạng tồn tại?', answer: '2' }, // Dimer and polymer/chain forms.
    { question: 'Dãy gồm các chất có thể điều chế trực tiếp acetic acid là:', answer: 'CH3OH, C2H5OH, CH3CHO.' },
    { question: 'Các hợp chất: CH3COOH, C2H5OH và C6H5OH xếp theo thứ tự tăng dần tính acid là:', answer: 'C2H5OH < C6H5OH < CH3COOH' },
    { question: 'Chất nào được dùng chất bảo quản thực phẩm cho nước sốt cà chua, bơ thực vật,…?', answer: 'Benzoic acid' },
    { question: 'Tính acid trong dãy sau thay đổi như thế nào: HCOOH, CH3COOH, C2H5COOH.', answer: 'Giảm' },
    { question: 'Cho 13,4 gam hỗn hợp X gồm hai acid no, đơn chức, mạch hở, kế tiếp nhau trong cùng dãy đồng đẳng tác dụng với Na dư, thu được 17,8 gam muối. Khối lượng của acid có số nguyên tử carbon ít hơn có trong X là:', answer: '6,0 gam' },
    { question: 'Chọn phát biểu sai về phản ứng ester hóa:', answer: 'Hiệu suất phản ứng thường cao' }, // Esterification is typically an equilibrium reaction with moderate yield unless driven to completion.
    { question: 'Trong nhóm carboxyl, mật độ electron tại nhóm OH chuyển dịch về nhóm C=O nên:', answer: 'Nguyên tử H trong nhóm OH linh động hơn và mang một phần điện tích dương.' },
    { question: 'Hiện nay, một lượng lớn acetic acid trong công nghiệp được sản xuất bằng cách:', answer: 'Carbonyl hóa methanol' },
    { question: 'Cho 150 gam acetic acid tác dụng với 161 gam ethyl alcohol có H2SO4 đặc làm xúc tác. Khi phản ứng xảy ra xong thì có 60% lượng acid chuyển thành ester. Khối lượng ester thu được sau khi phản ứng kết thúc là:', answer: '132 gam' }, // Calculation: Mol acetic acid = 150/60 = 2.5 mol. Mol ethanol = 161/46 = 3.5 mol. Acid is limiting. Mol ester formed = 2.5 * 60% = 1.5 mol. Mass ester = 1.5 * 88 = 132 g. Answer is correct.
    { question: 'Chọn phát biểu đúng:', answer: 'Oxalic acid tạo nên vị chua của me.' }, // Note: Tartaric acid is the main acid in tamarind (me), but oxalic acid is also present. The user provided this answer.
    { question: 'Cho các phản ứng sau ở điều kiện thích hợp:(1)Lên men giấm ethyl alcohol.(2)Oxi hóa acetaldehyde.(3)Oxi hóa không hoàn toàn butane(4)Carbonyl hóa methanol.Trong những phản ứng trên, số phản ứng tạo ra acetic acid là:', answer: '4' },
    { question: 'Gọi tên phản ứng sau:', answer: 'Phản ứng ester hóa' }, // Representing image-based question
    { question: 'Tên gọi của acid sau:', answer: 'Cinnamic acid' } // Representing image-based question
];
// ** NEW QA DATA END **


console.log("Bắt đầu script.");
console.log("Dữ liệu qaData:", qaData);

function renderQAItems(data) {
    console.log("Hàm renderQAItems được gọi với:", data);
    qaList.innerHTML = '';
    data.forEach((item, index) => {
        console.log("Đang xử lý mục:", item, "ở index:", index);
        const qaItem = document.createElement('div');
        qaItem.classList.add('qa-item');
        qaItem.dataset.question = item.question.toLowerCase(); // Store lowercase for case-insensitive search
        qaItem.dataset.originalQuestion = item.question;      // Store original question for display reset
        qaItem.dataset.index = index; // Store original index
        qaItem.dataset.answer = item.answer; // Store original answer for reset and search

        const hideButton = document.createElement('button');
        hideButton.classList.add('hide-button');
        hideButton.innerHTML = '<i class="fa fa-eye"></i>'; // Assuming Font Awesome is used
        hideButton.setAttribute('aria-label', `Ẩn câu hỏi ${index + 1}`); // For accessibility
        hideButton.addEventListener('click', () => hideQAItem(index));

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.textContent = item.question; // Use original question text

        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.textContent = item.answer; // Use original answer text

        qaItem.appendChild(hideButton);
        qaItem.appendChild(questionDiv);
        qaItem.appendChild(answerDiv);
        qaList.appendChild(qaItem);
        console.log("Đã thêm thẻ vào qaList:", qaItem);
    });
    updateHiddenCount();
    updateShowHiddenButtonVisibility();
    totalCountSpan.textContent = data.length; // Cập nhật tổng số lượng
    console.log("Số lượng thẻ sau khi render:", qaList.querySelectorAll('.qa-item').length);
    // console.log("Nội dung qaList sau render:", qaList.innerHTML); // Can be verbose
}

function hideQAItem(index) {
    console.log("Hàm hideQAItem được gọi với index:", index);
    const qaItem = document.querySelector(`.qa-item[data-index="${index}"]`);
    if (qaItem) {
        const hideButton = qaItem.querySelector('.hide-button');
        if (!qaItem.classList.contains('hidden')) {
            qaItem.classList.add('hidden');
            hiddenItems.push(parseInt(qaItem.dataset.index));
            hideButton.innerHTML = '<i class="fa fa-eye-slash"></i>'; // Change icon to slashed eye
            hideButton.setAttribute('aria-label', `Hiện câu hỏi ${index + 1}`);
            console.log("Đã ẩn thẻ index:", index);
        } else {
            qaItem.classList.remove('hidden');
            hiddenItems = hiddenItems.filter(itemIndex => itemIndex !== parseInt(qaItem.dataset.index));
             hideButton.innerHTML = '<i class="fa fa-eye"></i>'; // Change icon back to eye
            hideButton.setAttribute('aria-label', `Ẩn câu hỏi ${index + 1}`);
            console.log("Đã hiện thẻ index:", index);
        }
        updateHiddenCount();
        updateShowHiddenButtonVisibility();
    } else {
        console.warn("Không tìm thấy thẻ với index:", index);
    }
}

function updateHiddenCount() {
    const count = hiddenItems.length;
    hiddenCountSpan.textContent = count;
    console.log("Số lượng thẻ ẩn:", count);
}

function updateShowHiddenButtonVisibility() {
    if (hiddenItems.length > 0) {
        showHiddenBtn.style.display = 'block'; // Or 'inline-block' depending on layout
        console.log("Hiển thị nút 'Hiện thẻ ẩn'.");
    } else {
        showHiddenBtn.style.display = 'none';
        console.log("Ẩn nút 'Hiện thẻ ẩn'.");
    }
}

showHiddenBtn.addEventListener('click', () => {
    console.log("Nút 'Hiện thẻ ẩn' được click.");
    // Iterate through the stored hidden indices
    // Use [...hiddenItems] to iterate over a copy in case hideQAItem modifies it (though it shouldn't here)
    [...hiddenItems].forEach(index => {
         const qaItem = document.querySelector(`.qa-item[data-index="${index}"]`);
         if(qaItem && qaItem.classList.contains('hidden')) { // Double check it's still hidden
            // Instead of calling hideQAItem, directly manage state here
            qaItem.classList.remove('hidden');
            const hideButton = qaItem.querySelector('.hide-button');
            hideButton.innerHTML = '<i class="fa fa-eye"></i>';
            hideButton.setAttribute('aria-label', `Ẩn câu hỏi ${index + 1}`);
            console.log("Đã hiện thẻ index:", index);
         }
    });
    // Clear the hidden items state *after* iteration
    hiddenItems = [];
    updateHiddenCount();
    updateShowHiddenButtonVisibility();
    // Re-apply filter to make sure visibility matches search term
    filterQAItems();
});

function filterQAItems() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    console.log("Hàm filterQAItems được gọi với searchTerm:", searchTerm);
    const allQaItems = document.querySelectorAll('.qa-item');

    allQaItems.forEach(item => {
        const questionSearchText = item.dataset.question; // Lowercase question for search
        const originalQuestionText = item.dataset.originalQuestion; // Original case question
        const originalAnswerText = item.dataset.answer; // Original case answer
        const questionElement = item.querySelector('.question');
        const answerElement = item.querySelector('.answer');

        const isUserHidden = item.classList.contains('hidden'); // Check if user explicitly hid it

        // Determine if item should be visible based on search term
        const matchesSearch = searchTerm === '' ||
                              questionSearchText.includes(searchTerm) ||
                              originalAnswerText.toLowerCase().includes(searchTerm);

        // Reset highlights first - Use original text from dataset
        questionElement.textContent = originalQuestionText;
        answerElement.textContent = originalAnswerText;

        if (!isUserHidden && matchesSearch) {
            item.style.display = 'block'; // Show item

            if (searchTerm !== '') {
                // Highlight question
                const highlightRegex = new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
                const highlightedQuestion = originalQuestionText.replace(highlightRegex, match => `<span class="highlight">${match}</span>`);
                questionElement.innerHTML = highlightedQuestion;

                // Highlight answer
                const highlightedAnswer = originalAnswerText.replace(highlightRegex, match => `<span class="highlight">${match}</span>`);
                answerElement.innerHTML = highlightedAnswer;
            }
        } else {
            item.style.display = 'none'; // Hide item if user-hidden or doesn't match search
        }
    });
}


searchInput.addEventListener('input', filterQAItems);

// Initial Setup
console.log("Gọi hàm renderQAItems ban đầu.");
if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', () => renderQAItems(qaData));
} else {
    // `DOMContentLoaded` has already fired
    renderQAItems(qaData);
}

console.log("Giá trị ban đầu của totalCountSpan:", totalCountSpan.textContent);
console.log("Giá trị ban đầu của hiddenCountSpan:", hiddenCountSpan.textContent);
console.log("Kết thúc script.");
