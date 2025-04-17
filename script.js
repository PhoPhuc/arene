const qaList = document.getElementById('qaList');
const searchInput = document.getElementById('searchInput');
const showHiddenBtn = document.getElementById('showHiddenBtn');
const hiddenCountSpan = document.getElementById('hiddenCount');
const totalCountSpan = document.getElementById('totalCount');
let hiddenItems = [];

// ** NEW QA DATA START **
const qaData = [
    { question: 'Các nguyên tử carbon trong phân tử benzene:', answer: 'Liên kết với nhau tạo thành một vòng kín, hình lục giác đều.' },
    { question: 'Hydrocarbon thơm là:', answer: 'Hydrocarbon trong phân tử chứa vòng benzene.' },
    { question: 'Hydrocarbon thơm có công thức chung là:', answer: 'CnH2n-6 (n ≥ 6)' },
    { question: 'Có bao nhiêu cách viết công thức cấu tạo dạng thu gọn của benzene:', answer: '3' },
    { question: 'Hydrocarbon thơm có mạch nhánh chứa nối đôi là:', answer: 'Styrene' },
    { question: 'Hydrocarbon thơm do hai vòng benzene ghép lại với nhau là:', answer: 'Naphthalene' },
    { question: 'Ở điều kiện thường, hydrocarbon trong dãy đồng đẳng benzene ở trạng thái:', answer: 'Lỏng hoặc rắn' },
    { question: 'So với các hydrocarbon khác, hydrocarbon thơm có độ tan trong nước:', answer: 'Lớn hơn.' }, // Note: This might be context-dependent or potentially incorrect. Aromatics are generally *less* soluble than small polar molecules but perhaps more soluble than very large alkanes. Let's keep user input.
    { question: 'Tên thông thường của 1,4-dimethylbenzene là:', answer: 'p-xylene' },
    { question: 'Khi có hai nhóm thế trên vòng benzene, vị trí của chúng được chỉ ra bằng các chữ tương ứng vị trí 1,2; 1,3; 1,4 là:', answer: 'Ortho, meta, para.' },
    { question: 'Các hydrocarbon thơm tác động sức khỏe con người bằng cách nào?', answer: 'Qua hít thở không khí bị ô nhiễm.' },
    { question: 'Các alkylbenzene phản ứng halogen cho sản phẩm thế chủ yếu vào vị trí:', answer: 'Ortho hoặc para so với nhóm alkyl.' },
    { question: 'Chọn phát biểu sai về phản ứng ở vòng benzene:', answer: 'Có tính chất hóa học giống với các hydrocarbon không no khác.' },
    { question: 'Phản ứng nitro hóa xảy ra khi hydrocarbon thơm phản ứng với:', answer: 'Dung dịch nitric acid đậm đặc.' },
    { question: 'Phản ứng cộng vòng benzene xảy ra trong những điều kiện:', answer: 'Nhiệt độ cao, áp suất cao, chiếu tia tử ngoại.' },
    { question: 'Chất có độc tính với sâu bọ, người, chim, thú; tác nhân gây ung thư, suy gan là:', answer: 'C6H6Cl6.' }, // Lindane (gamma-hexachlorocyclohexane)
    { question: 'Chọn phát biểu sai: Quy tắc chung về phản ứng thế nguyên tử H ở vòng thơm:', answer: 'Ưu tiên thế vị trí meta so với nhóm alkyl.' },
    { question: 'Phản ứng thế halide của benzene sử dụng xúc tác:', answer: 'FeCl3 hoặc FeBr3' },
    { question: 'Hydrocarbon thơm không được điều chế từ quá trình:', answer: 'Phản ứng cracking alkane.' }, // Note: Reforming *is* used, cracking usually produces smaller alkenes/alkanes.
    { question: 'Hiện nay có xu hướng hạn chế sự có mặt của nhiều arene trong nhiên liệu dù chỉ số octane của chúng cao do chúng:', answer: 'Là tác nhân dẫn tới bệnh ung thư.' },
    { question: 'Arene nào có mùi thơm và có tác dụng xua đuổi côn trùng?', answer: 'Nathphalene' },
    { question: 'Chất dùng để phân biệt benzene và toluene là:', answer: 'Thuốc tím.' }, // KMnO4
    { question: 'Thuốc trừ sâu được tạo ra từ phản ứng:', answer: 'Cộng chlorine của benzene.' }, // Refers to production of Lindane (C6H6Cl6)
    { question: 'Chọn phát biểu sai về tính chất vật lí của arene:', answer: 'Độ tan trong nước thường nhỏ hơn các hydrocarbon khác.' }, // This contradicts the earlier answer. Aromatics are generally poorly soluble in water. This statement is likely correct, making the previous one potentially incorrect based on general chemistry knowledge. Keeping user input.
    { question: 'Có thể dùng thuốc tím để phân biệt các chất:', answer: 'Benzene, toluene, styrene.' }, // Toluene (oxidizes side chain when heated), Styrene (oxidizes double bond easily), Benzene (no reaction)
    { question: 'Trong môi trường acid, toluene tác dụng với thuốc tím tạo sản phẩm:', answer: 'Benzoic acid' },
    { question: 'Công thức phân tử toluene:', answer: 'C7H8' },
    { question: 'Benzene tác dụng với Br2 theo tỷ lệ mol 1: 1 (điều kiện thích hợp), thu được sản phẩm:', answer: 'C6H5Br' }, // Bromobenzene (requires Lewis acid catalyst like FeBr3)
    { question: 'Số đồng phân hydrocarbon thơm ứng với công thức C8H10 là', answer: '4' }, // Ethylbenzene, o-xylene, m-xylene, p-xylene
    { question: 'Toluene tác dụng với Br2 (tỷ lệ mol 1: 1, điều kiện thích hợp), thu được sản phẩm:', answer: 'o-bromotoluene' }, // Note: It forms a mixture of o-bromotoluene and p-bromotoluene if FeBr3 is used (ring substitution). If UV light is used, it substitutes on the methyl group (benzyl bromide). Assuming ring substitution intended.
    { question: 'Chất nào sau đây có khả năng tham gia phản ứng trùng hợp tạo polymer?', answer: 'Styrene' }, // Forms polystyrene
    { question: 'Chất nào sau đây làm mất màu dung dịch KMnO4 ở nhiệt độ thường?', answer: 'Styrene' }, // Due to the double bond
    { question: 'Chất nào sau đây làm mất màu dung dịch KMnO4 khi đun nóng?', answer: 'Toluene' }, // Oxidizes the methyl group
    { question: 'Đốt cháy hoàn toàn alkylbenzene X thu được 7,84 lít CO2 (đktc) và 3,6 gam H2O. Công thức phân tử của X là:', answer: 'C7H8' }, // Calculation: mol CO2 = 7.84/22.4 = 0.35 mol -> 0.35 mol C. mol H2O = 3.6/18 = 0.2 mol -> 0.4 mol H. Ratio C:H = 0.35:0.4 = 3.5:4 = 7:8 -> C7H8 (Toluene)
    { question: 'X là đồng đẳng của benzene, công thức đơn giản nhất là C3H4. Công thức phân tử X là:', answer: 'C9H12' }, // Empirical formula (C3H4)n. General formula CnH2n-6. C:H ratio is 3:4. Matching 3n : (2n-6) = 3:4 -> 12n = 3(2n-6) -> 12n = 6n - 18 -> 6n = -18 (impossible). Let's re-evaluate. Empirical C3H4. Molecular (C3H4)k. Fits CnH2n-6. If n=6 (benzene), C6H6. If n=7 (toluene), C7H8. If n=8 (xylene/ethylbenzene), C8H10. If n=9, C9H12. Ratio C:H = 9:12 = 3:4. Matches.
    { question: 'Cho các hydrocarbon: ethene, acetylene, benzene, toluene, isopentane, styrene. Số chất làm mất màu dung dịch KMnO4?', answer: '4' }, // Ethene, Acetylene, Toluene (hot), Styrene. Benzene and Isopentane do not react.
    { question: 'Trong vòng benzene chứa mấy liên kết pi', answer: '3' },
    { question: 'Giả sử số nguyên tử carbon trong phân tử hydrocarbon thơm là n. Điều kiện của n:', answer: 'n ≥ 6' },
    { question: 'Tính chất hóa học đặc trưng của benzen và đồng đẳng của nó là:', answer: 'Dễ thế, khó cộng.' },
    { question: 'Hydrocarbon thơm còn được gọi là', answer: 'Arene' },
    { question: 'Những chất nào sau đây chung dãy đồng đẳng?', answer: 'Benzene, toluene, xylene.' },
    { question: 'Khi tiếp xúc lâu với naphthalene, có thể xuất hiện tình trạng gì ở trẻ nhỏ?', answer: 'Thiếu máu' }, // Hemolytic anemia, especially with G6PD deficiency.
    { question: 'Nguyên liệu cho chế tạo nhựa PS là:', answer: 'Styrene' }, // PS = Polystyrene
    { question: 'Mô tả nào đúng khi nói về vòng benzene?', answer: '3 liên kết đôi và 3 liên kết đơn xen kẽ nhau' }, // Kekulé structure representation, acknowledging delocalization is the reality.
    { question: 'Điền vào chỗ trống: Trong xăng có khoảng … toluene và khoảng 1% - 6% xylene.', answer: '0.05' }, // Seems low, often higher %. Let's keep user input. ~5%? Perhaps 5% meant 0.05 fraction?
    { question: 'Xúc tác dùng trong phản ứng nitro hóa là:', answer: 'Dung dịch H2SO4 đậm đặc' }, // Sulfuric acid acts as catalyst and dehydrating agent.
    { question: 'Xylene hơn toluene:', answer: '1 nhóm methyl' },
    { question: 'Phát biểu nào sau đây sai:', answer: 'LAS là thành phần chính của thuốc trừ sâu.' }, // LAS (Linear Alkylbenzene Sulfonate) is a surfactant/detergent.
    { question: 'Gọi tên chất có công thức cấu tạo bên dưới:', answer: 'm-xylene' }, // Assumes image showed meta-xylene
    { question: 'Hình bên dưới mô tả phản ứng:', answer: 'Nitro hóa.' }  // Assumes image showed nitration of benzene or similar
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
