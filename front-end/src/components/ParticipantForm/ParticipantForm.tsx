import { memo } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import resets from '../_resets.module.css';
import { Component1_Property1Delete } from './Component1_Property1Delete/Component1_Property1Delete';
import { Component1_Property1NotCheck } from './Component1_Property1NotCheck/Component1_Property1NotCheck';
import { Component1_Property1PlusCircle } from './Component1_Property1PlusCircle/Component1_Property1PlusCircle';
import { Component5_Property1Create } from './Component5_Property1Comfirm/Component5_Property1Create';
import { useCreateParticipantForm } from '../../hooks/UseCreateParticipantFormReturn';
import { useUrlParams } from '../../hooks/useUrlParams';
import classes from './ParticipantForm.module.css';
import { VectorIcon2 } from './VectorIcon2';
import { VectorIcon3 } from './VectorIcon3';
import { VectorIcon4 } from './VectorIcon4';

interface Props {
  className?: string;
  hide?: {
    frame21?: boolean;
  };
  onConfirm?: () => void;
}

export const ParticipantForm: FC<Props> = memo(function ParticipantForm(props = {}) {
  const navigate = useNavigate();
  const { hostformId, userId } = useUrlParams();

  const handleConfirmSuccess = async () => {
    if (!hostformId || !userId) {
      console.error('Missing required parameters');
      return;
    }
    
    try {
      // Navigate to status page with the required parameters
      navigate(`/order-item/status/${hostformId}/${userId}`);
      
      // Call the original onConfirm if provided
      props.onConfirm?.();
    } catch (error) {
      console.error('Error navigating to status:', error);
    }
  };

  const {
    inputGroups,
    isAnonymous,
    userName,
    loading,
    error,
    menus,
    menuLoading,
    menuError,
    addInputGroup,
    deleteInputGroup,
    updateInputGroup,
    setIsAnonymous,
    setUserName,
    handleSubmit
  } = useCreateParticipantForm(handleConfirmSuccess);

  if (loading) {
    return <div className={classes.loading}>Loading...</div>;
  }

  const products = menus?.[0]?.products || [];

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      {error && (
        <div className={classes.error}>
          {error}
        </div>
      )}
      
      <div className={classes.headerContainer}>
        <div className={classes.headerTop}>
          <div className={classes.yourName}>Your Name</div>
        </div>
        <div className={classes.headerBottom}>
          <div className={classes.frame27}>
            <input
              type="text"
              className={classes.userNameInput}
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              readOnly={isAnonymous}
            />
          </div>
          <div className={classes.anonymousContainer}>
            <div className={classes.anonymous}>Anonymous</div>
            <Component1_Property1NotCheck
              className={classes.anonymousCheck}
              onClick={() => setIsAnonymous(!isAnonymous)}
              isChecked={isAnonymous}
            />
          </div>
        </div>
      </div>

      <div className={classes.orderLabels}>
        <div className={classes.order}>Order</div>
        <div className={classes.quantity}>Quantity</div>
        <div className={classes.price}>Price</div>
      </div>

      <div className={classes.orderContainer}>
        {inputGroups.map((item, index) => (
          <div key={index} className={classes.orderGroup}>
            <div className={classes.inputRow}>
              <select
                className={classes.selectField}
                value={item.order}
                onChange={(e) => {
                  if (e.target.value === "") {
                    updateInputGroup(index, 'order', '');
                    return;
                  }
                  const selectedProduct = products.find(p => p.product === e.target.value);
                  if (selectedProduct) {
                    updateInputGroup(index, 'order', JSON.stringify({
                      name: selectedProduct.product,
                      price: selectedProduct.price
                    }));
                  }
                }}
                required
              >
                <option value="">Select Product</option>
                {menuLoading && <option>Loading...</option>}
                {menuError && <option>Error loading products</option>}
                {products.map((product, idx) => (
                  <option 
                    key={idx} 
                    value={product.product}
                  >
                    {product.product}
                  </option>
                ))}
              </select>
              <div className={classes.frame223}>
                <input
                  type="text"
                  className={classes.frame223Input}
                  placeholder="Enter quantity"
                  value={item.quantity}
                  onChange={(e) => updateInputGroup(index, 'quantity', e.target.value)}
                />
              </div>
              <div className={classes.frame24}>
                <input
                  type="text"
                  className={classes.frame24Input}
                  placeholder="Enter price"
                  value={item.price}
                  onChange={(e) => updateInputGroup(index, 'price', e.target.value)}
                  readOnly
                />
              </div>
              {inputGroups.length > 1 && (
                <Component1_Property1Delete
                  className={classes.component8}
                  swap={{
                    vector: <VectorIcon4 className={classes.icon4} />,
                  }}
                  onClick={() => deleteInputGroup(index)}
                />
              )}
            </div>
            <div className={classes.descriptionRow}>
              <div className={classes.frame224}>
                <input
                  type="text"
                  className={classes.descriptionInput}
                  placeholder="Enter description (optional)"
                  value={item.description}
                  onChange={(e) => updateInputGroup(index, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.bottomButtons}>
        <Component1_Property1PlusCircle
          className={classes.component7}
          swap={{
            vector: <VectorIcon3 className={classes.icon3} />,
          }}
          onClick={addInputGroup}
        />
        <Component5_Property1Create
          className={classes.component9}
          onClick={handleSubmit}
          error={error}
        />
      </div>
    </div>
  );
});