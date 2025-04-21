<script>
  let phone = '';
  let password = '';
  let error = '';
  let patientData = null;
  let loading = false;

  async function handleSubmit() {
    error = '';
    loading = true;
    patientData = null;
    try {
      const res = await fetch('http://123.25.21.22:9090/get_patient_result/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });

      if (!res.ok) {
        error = 'Sai số điện thoại hoặc mật khẩu.';
        return;
      }

      patientData = await res.json();
    } catch (err) {
      error = 'Lỗi kết nối đến máy chủ.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="header">
  <div class="img">
    <img src="/icons/top.png" alt="">
  </div>
  <div>
    <h2>TRA CỨU KẾT QUẢ KHÁM I-MEDICARE</h2>
  </div>
</div>

<form on:submit|preventDefault={handleSubmit} class="form">
  <input bind:value={phone} placeholder="Số điện thoại" />
  <input type="password" bind:value={password} placeholder="Mật khẩu" />
  <button type="submit" disabled={loading}>{loading ? 'Đang tải...' : 'Tra cứu kết quả'}</button>
  {#if error}<p class="error">{error}</p>{/if}
</form>


<div class="content">
  {#if patientData?.data?.length > 0}
  <h2>Kết quả xét nghiệm</h2>

  {#each patientData.data as record}
    {#if record.test.length > 0}
      <div class="lab-result">
        <h4>Lần xét nghiệm: {record.test[0].date_ordered}</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Tên Xét Nghiệm</th>
              <th>Kết Quả</th>
              <th>Khoảng tham chiếu</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {#each record.test as test}
              {#if test.parent_test === ""}
                {#if test.result === ""}
                  <!-- Dịch vụ lớn chưa có kết quả -->
                  <tr>
                    <td colspan="4"><strong>{test.name_service}</strong></td>
                  </tr>
                {:else}
                  <!-- Dịch vụ chính có kết quả -->
                  <tr>
                    <td><strong>{test.name_service}</strong></td>
                    <td>{test.result}</td>
                    <td>
                      {#each test.list_interval as interval}
                        {interval.minimum} - {interval.maximum}
                      {/each}
                    </td>
                    <td>{test.date_ordered}</td>
                  </tr>
                {/if}
              {:else}
                <!-- Dịch vụ con -->
                <tr>
                  <td>{test.sub}</td>
                  <td>{test.result}</td>
                  <td>
                    {#each test.list_interval as interval}
                      {interval.minimum} - {interval.maximum}
                    {/each}
                  </td>
                  <td>{test.date_ordered}</td>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/each}
{:else}
  <p>Không có kết quả xét nghiệm.</p>
{/if}


</div>



<footer class="footer">
  <div class="footer-container">
    <!-- Cột 1: Logo + thông tin liên hệ -->
    <div class="footer-column contact-info">
      <img src="/icons/logo-medicare.png" alt="I-MEDICARE Logo" class="logo" />
      <ul>
        <li><strong>Have a question?</strong><br />024-3880-3333</li>
        <li><strong>Contact us at</strong><br />Trung tâm thương mại The Garden, Mễ Trì, Hà Nội</li>
        <li><strong>Email</strong><br />clinic.imedic@gmail.com</li>
      </ul>
      <div class="social-icons">
        <a href="#"><img src="/icons/facebook.png" alt="Facebook" /></a>
        <a href="#"><img src="/icons/kakao.png" alt="Talk" /></a>
        <a href="#"><img src="/icons/youtube.png" alt="YouTube" /></a>
        <a href="#"><img src="/icons/zalo.png" alt="Zalo" /></a>
        <a href="#"><img src="/icons/tiktok.png" alt="TikTok" /></a>
      </div>
    </div>

    <!-- Cột 2: Giờ làm việc -->
    <div class="footer-column">
      <h4>Giờ làm việc</h4>
      <p>Giờ làm việc tại phòng khám</p>
      <p>Thứ 2 - Thứ 6: <strong>08:30 - 19:30</strong></p>
      <p>Thứ Bảy: <strong>08:30 - 17:30</strong></p>
      <p>Chủ Nhật: <strong>08:30 - 15:30</strong></p>
    </div>

    <!-- Cột 3: Dịch vụ -->
    <div class="footer-column">
      <h4>Dịch vụ</h4>
      <ul>
        <li>Xe Khám Lưu Động</li>
        <li>Các Dịch Vụ</li>
        <li>Liên hệ</li>
        <li>Chuyên khoa</li>
      </ul>
    </div>

    <!-- Cột 4: Quy chế hoạt động -->
    <div class="footer-column">
      <h4>Quy chế hoạt động</h4>
      <ul>
        <li>Trách nhiệm và cam kết</li>
        <li>Chính sách bảo vệ thông tin</li>
        <li>Quy Chế Hoạt Động</li>
      </ul>
    </div>

    <!-- Cột 5: Đăng ký tư vấn -->
    <div class="footer-column">
      <h4>Đăng ký tư vấn</h4>
      <p>Để lại số điện thoại để nhận tư vấn miễn phí</p>
      <div class="subscribe">
        <input type="text" placeholder="Nhập số điện thoại của bạn" />
        <button>Đăng ký ngay</button>
      </div>
      <!-- <img src="/icons/dmca-badge.svg" alt="DMCA protected" class="dmca" /> -->
      <p>MST/ĐKKD/QĐTL: 0106752715</p>
      <p>Giấy phép hoạt động cơ sở khám chữa bệnh số 3183/BYT–CCHN Ngày Cấp 29/01/2013</p>
    </div>
  </div>

  <!-- Nút Liên hệ + Cuộn lên -->
  <!-- <div class="contact-float">
    <div class="contact-bubble">Liên hệ ngay!<br />
      <img src="/icons/headset.svg" alt="" />
    </div>
    <a href="#" class="scroll-top">
      <img src="/icons/up-arrow.svg" alt="Lên đầu trang" />
    </a>
  </div> -->
</footer>



<style>

  .header{
    /* background-color: #f9f9fb; */
    /* padding: 20px; */
    text-align: center;
    font-family: sans-serif;
    color: rgb(40 37 96 / var(--tw-text-opacity, 1));
    font-size: 1.75rem;
  }

  .header .img {
    display: flex;
    justify-content: center;
    align-items: center;
    
    padding-top: -20px;
  }

  .header img {
    width: 1600px;
    height: auto;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: auto;
    padding: 2rem;
  }

  .form input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .form button {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .error {
    color: red;
  }
  .content {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
  }

  .content h2 {
    /* margin-top: 0.5rem; */
    text-align: center;
    font-size: 2.5rem;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    border: 1px solid #ccc;
  }

  .table th, .table td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }



  .footer {
  background-color: #f9f9fb;
  padding: 40px 60px;
  position: relative;
  font-family: sans-serif;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;
}

.footer-column {
  flex: 1;
  min-width: 200px;
}

.footer-column h4 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 8px;
}

.contact-info ul li {
  margin-bottom: 10px;
}

.logo {
  width: 180px;
  margin-bottom: 20px;
}

.social-icons {
  margin-top: 10px;
}

.social-icons a img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.subscribe {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.subscribe input {
  padding: 8px;
  border-radius: 20px;
  border: 1px solid #ccc;
  flex: 1;
}

.subscribe button {
  background-color: #201a56;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
}

.dmca {
  margin: 10px 0;
  height: 30px;
}

/* Liên hệ nổi + scroll top */
.contact-float {
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-align: center;
}

.contact-bubble {
  background: #fff3ef;
  color: #f35a00;
  border: 2px solid #f35a00;
  border-radius: 50%;
  padding: 10px;
  font-size: 12px;
  margin-bottom: 12px;
  width: 60px;
  height: 60px;
  font-weight: bold;
  line-height: 1.2;
}

.contact-bubble img {
  width: 24px;
  margin-top: 4px;
}

.scroll-top img {
  width: 40px;
  height: 40px;
  background: #00194b;
  border-radius: 50%;
  padding: 8px;
}

</style>
